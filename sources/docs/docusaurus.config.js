const {posix: path} = require('path')

const {manifest} = require('../../package.json')
const themeConfig = require('./docusaurus.theme')

const pluginBlog = require.resolve(
  '@docusaurus/plugin-content-blog',
)
const pluginDocs = require.resolve(
  '@docusaurus/plugin-content-docs',
)
const pluginSearch = require.resolve('docusaurus-lunr-search')

const presetClassic = require.resolve(
  '@docusaurus/preset-classic',
)

module.exports = {
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
  themeConfig: themeConfig,
  presets: [
    [
      presetClassic,
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
      pluginBlog,
      {
        id: 'releases',
        path: './releases',
        routeBasePath: 'releases',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      pluginDocs,
      {
        id: 'api',
        path: './api',
        routeBasePath: 'api',
        sidebarPath: './sidebars/docs.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      pluginDocs,
      {
        id: 'guides',
        path: './guides',
        routeBasePath: 'guides',
        sidebarPath: './sidebars/docs.js',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
    [
      pluginDocs,
      {
        id: 'extensions',
        path: './extensions',
        routeBasePath: 'extensions',
        sidebarPath: './sidebars/docs.js',
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
