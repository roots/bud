// @ts-check
/**
 * \@typedef {import('@docusaurus/types').DocusaurusConfig} Config
 *
 */

const {posix: path} = require('path')
const darkTheme = require('prism-react-renderer/themes/dracula')
const theme = require('prism-react-renderer/themes/github')
const {manifest} = require('../package.json')

/**
 * \@type {Partial<Config>} config
 */
const config = {
  title: manifest.name,
  tagline: manifest.description,
  url: manifest.url.docs,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: manifest.organization.favicon,
  organizationName: manifest.organization.name,
  projectName: manifest.name,
  customFields: manifest,
  themeConfig: {
    announcementBar: {
      id: 'announcementBar-1', // Increment on change
      content: `⭐️ If you like Bud.js, give it a star on <a target="_blank" rel="noopener noreferrer" href="${manifest.url.web}">GitHub</a>! ⭐`,
    },
    hideableSidebar: true,
    prism: {
      additionalLanguages: ['php'],
      darkTheme,
      theme,
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: manifest.name,
        src: manifest.logo,
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: 'Guides',
          docsPluginId: 'guides',
        },
        {
          type: 'doc',
          docId: 'index',
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
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: manifest.url.web,
          label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
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
              to: '/guides/getting-started/',
            },
            {
              label: 'Documentation',
              to: '/docs/',
            },
            {
              label: 'Extensions',
              to: '/extensions/',
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
          path: 'docs',
          sidebarPath: require.resolve('./sidebars/docs.js'),
          editUrl: path.join(
            manifest.url.web,
            `edit/next/site/docs/`,
          ),
        },
        blog: {
          path: './blog',
          showReadingTime: true,
        },
        pages: {
          path: 'pages',
        },
        theme: {
          customCss: path.join(__dirname, '/src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'guides',
        path: './guides',
        routeBasePath: 'guides',
        sidebarPath: './sidebars/docs.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'recipes',
        path: './recipes',
        routeBasePath: 'recipes',
        sidebarPath: './sidebars/docs.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'extensions',
        path: './extensions',
        routeBasePath: 'extensions',
        sidebarPath: './sidebars/docs.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'api',
        path: './api',
        routeBasePath: 'api',
        sidebarPath: false,
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsDir: ['extensions', 'guides', 'recipes', 'docs'],
        docsRouteBasePath: [
          'extensions',
          'guides',
          'recipes',
          'docs',
        ],
      },
    ],
  ],
}

module.exports = config
