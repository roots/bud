/**
 * @type {import('@docusaurus/types').DocusaurusConfig}
 */

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
      theme: require('prism-react-renderer/themes/dracula'),
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
        {to: '/api/api', label: 'API', position: 'right'},
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
          'packages/@roots/bud-framework/src/Build/index.ts',
          'packages/@roots/bud-framework/src/Compiler/index.ts',
          'packages/@roots/bud-framework/src/Configuration/index.ts',
          'packages/@roots/bud-framework/src/Dashboard/index.ts',
          'packages/@roots/bud-framework/src/Env/index.ts',
          'packages/@roots/bud-framework/src/Extensions/index.ts',
          'packages/@roots/bud-framework/src/Service/index.ts',
          'packages/@roots/bud-framework/src/Framework/index.ts',
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
