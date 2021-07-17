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
        {to: '/@roots', label: 'API', position: 'right'},
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
        path: './site/packages/@roots',
        routeBasePath: '/@roots',
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
        id: 'container',
        entryPoints: [
          'packages/@roots/container/types/index.d.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'container',
        readme: 'none',
        sidebar: {
          categoryLabel: 'container',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'api',
        entryPoints: [
          'packages/@roots/bud-api/types/index.d.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'bud-api',
        readme: 'none',
        sidebar: {
          categoryLabel: 'bud-api',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'bud',
        entryPoints: ['packages/@roots/bud/types/index.d.ts'],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'bud',
        readme: 'none',
        sidebar: {
          categoryLabel: 'bud',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'build',
        entryPoints: [
          'packages/@roots/bud-build/types/index.d.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'bud-build',
        readme: 'none',
        sidebar: {
          categoryLabel: 'bud-build',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'cache',
        entryPoints: [
          'packages/@roots/bud-cache/types/index.d.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'bud-cache',
        readme: 'none',
        sidebar: {
          categoryLabel: 'bud-cache',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'compiler',
        entryPoints: [
          'packages/@roots/bud-compiler/types/index.d.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'bud-compiler',
        readme: 'none',
        sidebar: {
          categoryLabel: 'bud-compiler',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'extensions',
        entryPoints: [
          'packages/@roots/bud-extensions/types/index.d.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'bud-extensions',
        readme: 'none',
        sidebar: {
          categoryLabel: 'bud-extensions',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
    [
      require.resolve('docusaurus-plugin-typedoc'),
      {
        id: 'hooks',
        entryPoints: [
          'packages/@roots/bud-hooks/types/index.d.ts',
        ],
        tsconfig: `tsconfig.dev.json`,
        docsRoot: 'site/packages/@roots',
        out: 'bud-hooks',
        readme: 'none',
        sidebar: {
          categoryLabel: 'bud-hooks',
          sidebarFile: null,
          fullNames: true,
        },
      },
    ],
  ],
}
