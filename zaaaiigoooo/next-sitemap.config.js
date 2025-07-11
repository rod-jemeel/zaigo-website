/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zaigo.ai',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [
    '/404',
    '/500',
    '/server-sitemap.xml',
    '/health',
    '/api/*',
    '/health-check.html'
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://zaigo.ai/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/health',
          '/health-check.html'
        ],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom logic for individual pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // About section is important
    if (path.startsWith('/about')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Use default transformation for all other paths
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};