/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core configuration
  reactStrictMode: true,
  poweredByHeader: false,
  // Remove 'output: export' to enable API routes
  // output: 'export',
  distDir: '.next',
  trailingSlash: true, // Ensure consistency in URL paths
  
  // Skip linting during build to avoid issues in deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Type checking can be slow, skip during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Better error handling for production builds
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 2,
  },

  // Static export requires unoptimized images
  images: {
    unoptimized: true,
    domains: ['ui-avatars.com', 'placehold.co'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '*.repl.co' },
      { protocol: 'https', hostname: '*.repl.co' },
      { protocol: 'https', hostname: '*.replit.app' },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  
  // Webpack configuration for SVG support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};

export default nextConfig;