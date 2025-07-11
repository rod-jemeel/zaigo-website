import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: join(__dirname, "..", ".env") });

const V0_API_KEY = process.env.V0_API_KEY;
const V0_API_URL = "https://api.v0.dev/v1/chat/completions";

// In-memory conversation storage
const conversations = new Map();

class V0Server {
  constructor() {
    this.server = new Server(
      {
        name: "v0-mcp",
        version: "1.0.0",
        description: "MCP server for v0 API with conversation memory",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "v0_generate",
          description: "Generate UI components using v0 AI. Creates a new conversation or continues an existing one.",
          inputSchema: {
            type: "object",
            properties: {
              prompt: {
                type: "string",
                description: "The prompt describing the UI component you want to generate or modify",
              },
              conversationId: {
                type: "string",
                description: "Optional conversation ID to continue an existing conversation. If not provided, a new conversation will be started.",
              },
              model: {
                type: "string",
                description: "The v0 model to use",
                enum: ["v0-1.5-md", "v0-1.5-lg", "v0-1.0-md"],
                default: "v0-1.5-md",
              },
              systemPrompt: {
                type: "string",
                description: "Optional system prompt to guide the generation",
              },
            },
            required: ["prompt"],
          },
        },
        {
          name: "v0_list_conversations",
          description: "List all active v0 conversations with their IDs and summaries",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "v0_get_conversation",
          description: "Get the full conversation history for a specific conversation ID",
          inputSchema: {
            type: "object",
            properties: {
              conversationId: {
                type: "string",
                description: "The conversation ID to retrieve",
              },
            },
            required: ["conversationId"],
          },
        },
        {
          name: "v0_clear_conversation",
          description: "Clear a specific conversation or all conversations",
          inputSchema: {
            type: "object",
            properties: {
              conversationId: {
                type: "string",
                description: "The conversation ID to clear. If not provided, all conversations will be cleared.",
              },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "v0_generate":
          return await this.generateUI(args);
        case "v0_list_conversations":
          return await this.listConversations();
        case "v0_get_conversation":
          return await this.getConversation(args);
        case "v0_clear_conversation":
          return await this.clearConversation(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async generateUI(args) {
    if (!V0_API_KEY) {
      throw new Error("V0_API_KEY not found in environment variables");
    }

    const { prompt, conversationId, model = "v0-1.5-md", systemPrompt } = args;
    
    // Generate or use existing conversation ID
    const convId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get existing conversation or create new one
    let conversation = conversations.get(convId) || { messages: [] };
    
    // Add system prompt if provided and conversation is new
    if (systemPrompt && conversation.messages.length === 0) {
      conversation.messages.push({
        role: "system",
        content: systemPrompt,
      });
    }
    
    // Add user message
    conversation.messages.push({
      role: "user",
      content: prompt,
    });

    try {
      const response = await fetch(V0_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${V0_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: conversation.messages,
          stream: false,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`v0 API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      
      // Extract the assistant's response
      const assistantMessage = data.choices[0].message;
      conversation.messages.push(assistantMessage);
      
      // Store updated conversation
      conversations.set(convId, conversation);
      
      // Extract code from the response if present
      const codeMatch = assistantMessage.content.match(/```(?:tsx|jsx|javascript|typescript)?\n([\s\S]*?)```/);
      const code = codeMatch ? codeMatch[1].trim() : null;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              conversationId: convId,
              response: assistantMessage.content,
              code: code,
              messageCount: conversation.messages.length,
              model: model,
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to generate UI: ${error.message}`);
    }
  }

  async listConversations() {
    const conversationList = Array.from(conversations.entries()).map(([id, conv]) => {
      // Get first user message as summary
      const firstUserMsg = conv.messages.find(msg => msg.role === "user");
      const summary = firstUserMsg ? firstUserMsg.content.substring(0, 100) + "..." : "No messages";
      
      return {
        id,
        messageCount: conv.messages.length,
        summary,
        created: new Date(parseInt(id.split("_")[1])).toISOString(),
      };
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            conversations: conversationList,
            total: conversationList.length,
          }, null, 2),
        },
      ],
    };
  }

  async getConversation(args) {
    const { conversationId } = args;
    const conversation = conversations.get(conversationId);
    
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            conversationId,
            messages: conversation.messages,
            messageCount: conversation.messages.length,
          }, null, 2),
        },
      ],
    };
  }

  async clearConversation(args) {
    const { conversationId } = args;
    
    if (conversationId) {
      if (!conversations.has(conversationId)) {
        throw new Error(`Conversation ${conversationId} not found`);
      }
      conversations.delete(conversationId);
      return {
        content: [
          {
            type: "text",
            text: `Cleared conversation ${conversationId}`,
          },
        ],
      };
    } else {
      const count = conversations.size;
      conversations.clear();
      return {
        content: [
          {
            type: "text",
            text: `Cleared all ${count} conversations`,
          },
        ],
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("v0 MCP server running on stdio");
  }
}

const server = new V0Server();
server.run().catch(console.error);