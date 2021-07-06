/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
  title: 'bud',
  tagline:
    'A frontend build tooling framework combining the best parts of Symfony Encore and Laravel Mix',
  url: 'https://budjs.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'roots',
  projectName: 'bud',
  themeConfig: {
    navbar: {
      logo: {
        alt: 'bud',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started/intro',
          position: 'left',
          label: 'Guide',
          docsPluginId: 'guide',
        },
        {
          type: 'doc',
          docId: 'bud.alias',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Extensions',
          docsPluginId: 'extensions',
        },
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Recipes',
          docsPluginId: 'recipes',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/roots/bud',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Getting started',
              to: '/guide/getting-started/intro',
            },
            {
              label: 'Documentation',
              to: '/docs/bud.alias',
            },
            {
              label: 'Extensions',
              to: '/extensions/index',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/rootswp',
            },
            {
              label: 'Discourse',
              href: 'https://discourse.roots.io/c/bud/24',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/roots/bud',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Roots Foundation, LLC.`,
    },
    googleAnalytics: {
      trackingID: 'UA-71591-53',
      anonymizeIP: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'site/docs',
          sidebarPath: require.resolve(
            './site/src/sidebars/docs.js',
          ),
          editUrl:
            'https://github.com/roots/bud/edit/next/site/docs/',
        },
        blog: {
          path: 'site/blog',
          showReadingTime: true,
        },
        pages: {
          path: 'site/pages',
        },
        theme: {
          customCss: require.resolve(
            './site/src/css/custom.css',
          ),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'guide',
        path: './site/guide',
        routeBasePath: 'guide',
        sidebarPath: require.resolve(
          './site/src/sidebars/guide.js',
        ),
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'recipes',
        path: './site/recipes',
        routeBasePath: 'recipes',
        sidebarPath: require.resolve(
          './site/src/sidebars/recipes.js',
        ),
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'extensions',
        path: './site/extensions',
        routeBasePath: 'extensions',
        sidebarPath: require.resolve(
          './site/src/sidebars/extensions.js',
        ),
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsDir: [
          'site/extensions',
          'site/guide',
          'site/recipes',
          'site/docs',
        ],
        docsRouteBasePath: [
          'extensions',
          'guide',
          'recipes',
          'docs',
        ],
      },
    ],
  ],
}
