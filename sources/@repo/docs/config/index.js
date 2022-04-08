const {join, resolve} = require('path')

const config = require('../../../../config/monorepo.config')
const themeConfig = require('./docusaurus.theme')

const presetClassic = require.resolve('@docusaurus/preset-classic')
const pluginBlog = require.resolve('@docusaurus/plugin-content-blog')
const pluginDocs = require.resolve('@docusaurus/plugin-content-docs')
const pluginSearch = require.resolve('docusaurus-lunr-search')

const docsPath = (path) =>
  resolve(__dirname, '..', path ?? '')

const sidebarPath = docsPath('sidebars/docs.js')

module.exports = {
  title: config.name,
  tagline: config.description,
  url: config.url.docs,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: config.organization.favicon,
  organizationName: config.organization.name,
  projectName: config.name,
  customFields: config,
  themeConfig,
  presets: [
    [
      presetClassic,
      {
        docs: {
          path: docsPath('content/docs'),
          sidebarPath,
          editUrl: join(config.url.web, `edit/main/sources/@repo/docs/`),
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        blog: {
          path: docsPath('content/blog'),
          showReadingTime: true,
        },
        pages: {
          path: docsPath('content/pages'),
        },
        theme: {
          customCss: docsPath('src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      pluginBlog,
      {
        id: 'releases',
        path: docsPath('content/releases'),
        remarkPlugins: [
          [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
        ],
        routeBasePath: 'releases',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      pluginDocs,
      {
        id: 'dev',
        path: docsPath('content/dev'),
        remarkPlugins: [
          [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
        ],
        routeBasePath: 'dev',
        sidebarPath,
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      pluginDocs,
      {
        id: 'guides',
        path: docsPath('content/guides'),
        remarkPlugins: [
          [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
        ],
        routeBasePath: 'guides',
        sidebarPath: docsPath('sidebars/guides.js'),
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      pluginDocs,
      {
        id: 'extensions',
        path: docsPath('content/extensions'),
        routeBasePath: 'extensions',
        sidebarPath,
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      pluginSearch,
      {
        excludeRoutes: ['blog/**/*', 'pages/**/*'],
      },
    ],
  ],
}
