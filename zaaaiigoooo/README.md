# Zaigo Labs Website

Modern website for Zaigo Labs built with Next.js and Tailwind CSS.

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Deploy

To build the website for local development:

```bash
# Clear previous build files
rm -rf .next out

# Build the project
npm run build

# Start the development server
npm run dev
```

To build for Netlify deployment:

```bash
# Clear previous build files
rm -rf .next out

# Build the project using the Netlify build script
npm run netlify-build
```

The site is configured for static deployment on Netlify, with all dynamic routes properly configured for static generation.

## Features

- Modern Next.js App Router
- Fully responsive design
- Custom components with Tailwind CSS
- Accessible UI components from Shadcn UI
- Team profile showcase with region-specific avatars
- TypeScript support
- Health check endpoints for deployment platforms

## Folder Structure

- `/public`: Static assets like images and fonts
- `/src/app`: Next.js App Router pages
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions
- `/src/styles`: Global styles and Tailwind configuration

## Deployment

The site is configured for deployment on Netlify with built-in health checks and edge functions.

## Troubleshooting

### Missing Module Errors
If you encounter errors related to missing chunk files:

1. Make sure your `next.config.mjs` has correct configuration:
   ```js
   // Use .next as the build directory
   distDir: '.next',
   // For static export with images
   output: 'export',
   ```

2. Clear all build artifacts and cache:
   ```bash
   rm -rf .next out
   npm cache clean --force
   ```

3. Rebuild the project with the correct script:
   ```bash
   npm run netlify-build
   ```

### Image Loading Issues
If images aren't displaying correctly:

1. Ensure `unoptimized: true` is set in the images config when using static export
2. Make sure paths are relative and start with `/images/team/` for team photos
3. Check that image files exist in the output directory after build