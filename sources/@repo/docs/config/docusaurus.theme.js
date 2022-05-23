const dracula = require('prism-react-renderer/themes/dracula')
const github = require('prism-react-renderer/themes/github')

const config = require('../../../../config/monorepo.config')

/**
 * Announcement bar config
 *
 * @public
 */
const announcementBar = {
  id: 'announcementBar-2', // Increment on change
  content: `🧹 We're working hard to get the docs up to date with Bud v5. Thanks for your understanding!`,
}

/**
 * Footer config
 *
 * @public
 */
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
          label: 'Configuration',
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
          href: config.organization.twitter,
        },
        {
          label: 'Discourse',
          href: config.url.discourse,
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
          href: config.url.web,
        },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} ${
    config.organization.name
  }.`,
}

/**
 * Metaadata config
 *
 * @public
 */
const metadata = [
  /**
   * Presentational
   */
  {name: 'theme-color', content: '#525ddc'},

  /**
   * Open graph
   */
  {name: 'fb:app_id', content: '1022828784420871'},
  {name: 'og:image', content: 'https://bud.js.org/img/bud.js.png'},
  {name: 'og:locale', content: 'en_US'},
  {name: 'og:type', content: 'website'},
  {name: 'og:url', content: 'https://bud.js.org'},

  /**
   * Twitter
   */
  {name: 'twitter:card', content: 'summary_large_image'},
  {name: 'twitter:creator', content: config.organization.twitter},
  {name: 'twitter:image', content: '/img/bud.js.png'},
  {name: 'twitter:site', content: config.organization.twitter},
  {name: 'twitter:url', content: config.url.docs},
]

/**
 * Navbar config
 *
 * @public
 */
const navbar = {
  hideOnScroll: true,
  logo: {
    alt: config.name,
    src: config.logo,
  },
  items: [
    {
      type: 'doc',
      docId: 'overview/index',
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
    {to: '/blog', label: 'Blog', position: 'right'},
    {
      href: '/dev',
      label: 'Dev',
      position: 'right',
      className: 'header-github-link',
    },
    {
      href: config.url.discourse,
      label: 'Community',
      position: 'right',
      className: 'header-discourse-link',
    },
    {
      href: config.url.web,
      label: 'GitHub',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub repository',
    },
  ],
}

/**
 * Prism theme config
 *
 * @public
 */
const prism = {
  additionalLanguages: ['php'],
  darkTheme: dracula,
  theme: github,
}

module.exports = {
  announcementBar,
  footer,
  metadata,
  navbar,
  prism,
}