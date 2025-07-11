/**
 * Simple health check endpoint for deployment platforms
 * Using Edge runtime for faster response times
 */
// export const runtime = 'edge';
export const dynamic = 'force-static';

export async function GET() {
  return new Response(
    JSON.stringify({ 
      status: 'ok',
      timestamp: new Date().toISOString() 
    }), 
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  );
}