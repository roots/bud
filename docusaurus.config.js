/** @type {import('@docusaurus/types').DocusaurusConfig} */

const dracula = require('prism-react-renderer/themes/dracula')
const project = require('./repo')

module.exports = {
  title: project.name,
  tagline: project.description,
  url: project.links.site,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: project.organization.favicon,
  organizationName: 'roots',
  projectName: project.name,
  themeConfig: {
    hideableSidebar: true,
    prism: {
      additionalLanguages: ['php'],
      theme: dracula,
    },
    navbar: {
      logo: {
        alt: 'bud',
        src: project.logo,
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
        {to: '/packages', label: 'API', position: 'right'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: project.links.repo,
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
              href: project.organization.twitter,
            },
            {
              label: 'Discourse',
              href: project.links.discourse,
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
              href: project.links.repo,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${
        project.organization.name
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
          editUrl: `${project.links.repo}/edit/next/site/docs/`,
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
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'packages',
        path: './site/packages',
        routeBasePath: 'packages',
        sidebarPath: require.resolve(
          './site/src/sidebars/packages.js',
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
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: `api.bud`,
        out: 'packages/bud',
        entryPoints: ['packages/@roots/bud/src/index.ts'],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site',
        readme: 'none',
        sidebar: {
          categoryLabel: '@roots/bud',
          fullNames: false,
          sidebarFile: null,
          indexLabel: undefined,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: `api.framework`,
        out: 'packages/bud-framework',
        entryPoints: [
          'packages/@roots/bud-framework/src/index.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site',
        readme: 'none',
        sidebar: {
          categoryLabel: '@roots/bud-framework',
          fullNames: false,
          sidebarFile: null,
          indexLabel: undefined,
        },
      },
    ],
  ],
}
