/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
  title: 'Bud',
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
        alt: 'My Site Logo',
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
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars/docs.js'),
          editUrl:
            'https://github.com/roots/bud/edit/next/site/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/roots/bud/edit/next/site/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'guide',
        path: 'guide',
        routeBasePath: 'guide',
        sidebarPath: require.resolve('./sidebars/guide.js'),
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'recipes',
        path: 'recipes',
        routeBasePath: 'recipes',
        sidebarPath: require.resolve('./sidebars/recipes.js'),
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'extensions',
        path: './extensions',
        routeBasePath: 'extensions',
        sidebarPath: require.resolve('./sidebars/extensions.js'),
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsDir: ['extensions', 'guide', 'recipes', 'docs'],
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
