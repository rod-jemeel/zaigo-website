import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not set in environment variables');
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    const systemPrompt = `You are an advanced drum pattern generator. Generate a creative 16-step drum pattern based on the user's style request.
    
Available sounds (use these exact IDs) - BE CREATIVE AND USE ALL OF THEM:
- p1: Kick 1 (deep bass drum)
- p2: Snare 1 (main snare)
- p3: Hi-Hat 1 (closed hi-hat)
- p4: Hi-Hat 2 (open hi-hat) 
- p5: Tom 1 (tom drum for fills and accents)
- p6: Snare 2 (alternative snare, great for ghost notes)
- p7: Kick 2 (punchy kick, use for variation)
- p8: Wood (percussive wood block, adds texture)

IMPORTANT RULES:
1. USE AT LEAST 5-6 DIFFERENT SOUNDS in each pattern for variety
2. Don't just use kick, snare, and hi-hat - be creative!
3. Add tom fills, wood percussion accents, use both kicks for variation
4. Use p6 (Snare 2) for ghost notes or off-beat snare hits
5. p8 (Wood) is great for Latin patterns, adding groove, or unique accents
6. Consider the style - jazz needs more toms and cymbals, electronic needs more variation
7. Layer sounds - two different sounds can hit on the same step

Return ONLY a JSON object with this structure:
{
  "pattern": {
    "p1": [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    "p2": [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    "p3": [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    "p4": [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    "p5": [0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0],
    "p6": [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
    "p7": [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    "p8": [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
  },
  "bpm": 120,
  "name": "Pattern Name"
}

Where 1 = hit, 0 = rest. The example above uses ALL 8 sounds - follow this approach!`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://zaigo.co", 
        "X-Title": "Zaigo Labs MPC",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.5-flash",
        "messages": [
          {
            "role": "system",
            "content": systemPrompt
          },
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.8,
        "max_tokens": 1000
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter error:', error);
      return NextResponse.json({ error: 'Failed to generate rhythm' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    // Extract JSON from the response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const rhythmData = JSON.parse(jsonMatch[0]);
      return NextResponse.json(rhythmData);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      return NextResponse.json({ error: 'Failed to parse rhythm pattern' }, { status: 500 });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}