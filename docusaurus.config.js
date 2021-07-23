/**
 * @type {import('@docusaurus/types').DocusaurusConfig}
 */

const {manifest} = require('./package.json')

const theme = require('prism-react-renderer/themes/dracula')

module.exports = {
  title: manifest.name,
  tagline: manifest.description,
  url: manifest.url.docs,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: manifest.organization.favicon,
  organizationName: manifest.organization.name,
  projectName: manifest.name,
  themeConfig: {
    hideableSidebar: true,
    prism: {
      additionalLanguages: ['php'],
      theme,
    },
    navbar: {
      logo: {
        alt: manifest.name,
        src: manifest.logo,
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
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
        {to: '/api/api', label: 'API', position: 'right'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: manifest.url.web,
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
              href: manifest.organization.twitter,
            },
            {
              label: 'Discourse',
              href: manifest.url.discourse,
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
              href: manifest.url.web,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${
        manifest.organization.name
      }.`,
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
          editUrl: manifest.url.web.concat(
            `/edit/next/site/docs/`,
          ),
        },
        blog: {
          path: 'site/blog',
          showReadingTime: true,
        },
        pages: {
          path: 'site/pages',
        },
        theme: {
          customCss: process
            .cwd()
            .concat('/site/src/css/custom.css'),
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
        sidebarPath: './site/src/sidebars/guide.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'recipes',
        path: './site/recipes',
        routeBasePath: 'recipes',
        sidebarPath: './site/src/sidebars/recipes.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'extensions',
        path: './site/extensions',
        routeBasePath: 'extensions',
        sidebarPath: './site/src/sidebars/extensions.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'api',
        path: './site/api',
        routeBasePath: 'api',
        sidebarPath: './site/src/sidebars/packages.js',
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
          'site/api',
        ],
        docsRouteBasePath: [
          'extensions',
          'guide',
          'recipes',
          'docs',
          'api',
        ],
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'bud',
        entryPoints: [
          'packages/@roots/bud-framework/src/index.ts',
        ],
        exclude: ['**/*.d.ts', '**/node_modules/**/*'],
        tsconfig: `tsconfig.dev.json`,
        plugin: ['typedoc-plugin-no-inherit'],
        readme: 'none',
        docsRoot: 'site',
        out: 'api',
        sidebar: {
          sidebarFile: null,
          fullNames: false,
        },
      },
    ],
  ],
}
