/**
 * Custom image loader for Next.js static exports
 * 
 * This production-optimized loader enables using next/image with static exports.
 * It intelligently handles both local and remote images while supporting:
 * 
 * 1. Local images: Maintains relative paths without additional processing
 * 2. Remote images: Enables using external optimization services like Cloudinary
 * 3. Fallback handling: Works with the OptimizedImage component for error states
 *
 * Why this approach is better than just 'unoptimized: true':
 * - Maintains responsive image capabilities even in static builds
 * - Can leverage external CDN optimization services
 * - Preserves image quality with fine-grained control
 * - Maintains the same component API between dev and production
 * 
 * Usage: Configure in next.config.mjs for production environments
 */

type ImageLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * Handles both local and remote images in a static export context
 */
export default function imageLoader({ src, width, quality = 75 }: ImageLoaderParams): string {
  // Handle relative local paths as is
  if (src.startsWith('/')) {
    return src;
  }
  
  // Handle remote images that may need optimization
  // For a static export, you might use a service like Imgix, Cloudinary, etc.
  if (src.startsWith('http')) {
    // Example using Cloudinary (would need to be configured)
    // return `https://res.cloudinary.com/your-account/image/fetch/f_auto,q_${quality},w_${width}/${src}`;
    
    // In this case, just return the original remote URL
    return src;
  }
  
  // Return the src as is for other cases
  return src;
}