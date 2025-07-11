/**
 * Simple root-level health check endpoint
 * Many deployment platforms check the root path directly
 */
export const dynamic = 'force-static';
export const revalidate = 0;

export async function GET() {
  // Immediately return a response for faster health checks
  return new Response('OK', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}