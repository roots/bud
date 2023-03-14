const dracula = require(`prism-react-renderer/themes/dracula`)

const config = require(`../../../../config/monorepo.config.cjs`)

/**
 * Announcement bar config
 */
const announcementBar = {
  id: `announcementBar-5`, // Increment on change
  content: `Support bud.js <a href="https://github.com/sponsors/roots">on github sponsors</a>`,
}

/**
 * Footer config
 */
const footer = {
  style: `dark`,
  links: [
    {
      title: `Links`,
      items: [
        {
          label: `Getting started`,
          to: `/guides/getting-started/`,
        },
        {
          label: `Configuration`,
          to: `/docs/config/`,
        },
        {
          label: `Extensions`,
          to: `/extensions/`,
        },
      ],
    },
    {
      title: `Community`,
      items: [
        {
          label: `Twitter`,
          href: config.organization.twitter,
        },
        {
          label: `Discourse`,
          href: config.url.discourse,
        },
      ],
    },
    {
      title: `More`,
      items: [
        {
          label: `Releases`,
          to: `/releases`,
        },
        {
          label: `GitHub`,
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
 */
const metadata = [
  /**
   * Presentational
   */
  {name: `theme-color`, content: `#525ddc`},

  /**
   * Open graph
   */
  {name: `fb:app_id`, content: `1022828784420871`},
  {name: `og:image`, content: `https://bud.js.org/img/bud.js.png`},
  {name: `og:locale`, content: `en_US`},
  {name: `og:type`, content: `website`},
  {name: `og:url`, content: `https://bud.js.org`},

  /**
   * Twitter
   */
  {name: `twitter:card`, content: `summary_large_image`},
  {name: `twitter:creator`, content: config.organization.twitter},
  {name: `twitter:image`, content: `/img/bud.js.png`},
  {name: `twitter:site`, content: config.organization.twitter},
  {name: `twitter:url`, content: config.url.docs},

  /**
   * Google
   */
  {
    name: `google-site-verification`,
    content: `PHCTrbi0cn0A3I_eE3g2Gr9WnsFMsvtKRxVP8ghfCfM`,
  },
]

/** @type {import('@docusaurus/preset-classic').ThemeConfig['navbar']} */
const navbar = {
  hideOnScroll: true,
  logo: {
    alt: config.name,
    src: config.logo,
  },
  items: [
    {
      type: `doc`,
      docId: `index`,
      position: `left`,
      label: `Guides`,
      docsPluginId: `guides`,
    },
    {
      label: `Docs`,
      href: `/docs/config`,
      position: `left`,
    },
    {
      type: `doc`,
      docId: `index`,
      position: `left`,
      label: `Extensions`,
      docsPluginId: `extensions`,
    },
    {
      to: `/releases`,
      label: `Releases`,
      position: `left`,
      items: [
        {to: `/releases/tags/6-11`, label: `6.11`},
        {to: `/releases/tags/6-9`, label: `6.9`},
        {to: `/releases/tags/6-8`, label: `6.8`},
        {to: `/releases/tags/6-7`, label: `6.7`},
        {to: `/releases/tags/6-6`, label: `6.6`},
        {to: `/releases/tags/6-5`, label: `6.5`},
        {to: `/releases/tags/6-4`, label: `6.4`},
        {to: `/releases/tags/6-3`, label: `6.3`},
      ],
    },
    {
      href: `/dev`,
      label: `Dev`,
      position: `right`,
      className: `header-github-link`,
    },
    {
      href: config.url.discourse,
      label: `Community`,
      position: `right`,
      className: `header-discourse-link`,
    },
    {
      href: config.url.web,
      label: `GitHub`,
      position: `right`,
      className: `header-github-link`,
      'aria-label': `GitHub repository`,
    },
  ],
}

/**
 * Prism theme config
 */
const prism = {
  additionalLanguages: [`php`],
  darkTheme: dracula,
  theme: dracula,
}

module.exports = {
  announcementBar,
  footer,
  metadata,
  navbar,
  prism,
}
