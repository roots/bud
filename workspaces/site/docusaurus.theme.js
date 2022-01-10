const darkTheme = require('prism-react-renderer/themes/dracula')
const {manifest} = require('../package.json')
const theme = require('prism-react-renderer/themes/github')

const announcementBar = {
  id: 'announcementBar-2', // Increment on change
  content: `🧹 We're working hard to get the docs up to date with Bud v5. Thanks for your understanding!`,
}

const footer = {
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
        {
          label: 'Releases',
          to: '/releases/',
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
}

const navbar = {
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
      href: '/api',
      label: 'Api',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'Bud API documentation',
    },
    {
      href: '/releases',
      label: 'Releases',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'Release notes',
    },
    {
      href: manifest.url.web,
      label: 'GitHub',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub repository',
    },
  ],
}

const prism = {
  additionalLanguages: ['php'],
  darkTheme,
  theme,
}

module.exports = {
  announcementBar,
  hideableSidebar: true,
  prism,
  navbar,
  footer,
}
