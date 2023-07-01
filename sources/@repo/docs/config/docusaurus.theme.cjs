const dracula = require(`prism-react-renderer/themes/dracula`)
const config = require(`../../../../config/monorepo.config.cjs`)

/**
 * Announcement bar config
 */
const announcementBar = {
  content: `Support bud.js <a href="https://github.com/sponsors/roots">on github sponsors</a>`,
  id: `announcementBar-5`, // Increment on change
}

/**
 * Footer config
 */
const footer = {
  copyright: `Copyright © ${new Date().getFullYear()} ${
    config.organization.name
  }.`,
  links: [
    {
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
      title: `Links`,
    },
    {
      items: [
        {
          href: config.organization.twitter,
          label: `Twitter`,
        },
        {
          href: config.url.discourse,
          label: `Discourse`,
        },
      ],
      title: `Community`,
    },
    {
      items: [
        {
          label: `Releases`,
          to: `/releases`,
        },
        {
          href: config.url.web,
          label: `GitHub`,
        },
      ],
      title: `More`,
    },
  ],
  style: `dark`,
}

/**
 * Metaadata config
 */
const metadata = [
  /**
   * Presentational
   */
  {content: `#525ddc`, name: `theme-color`},

  /**
   * Open graph
   */
  {content: `1022828784420871`, name: `fb:app_id`},
  {content: `https://bud.js.org/img/bud.js.png`, name: `og:image`},
  {content: `en_US`, name: `og:locale`},
  {content: `website`, name: `og:type`},
  {content: `https://bud.js.org`, name: `og:url`},

  /**
   * Twitter
   */
  {content: `summary_large_image`, name: `twitter:card`},
  {content: config.organization.twitter, name: `twitter:creator`},
  {content: `/img/bud.js.png`, name: `twitter:image`},
  {content: config.organization.twitter, name: `twitter:site`},
  {content: config.url.docs, name: `twitter:url`},

  /**
   * Google
   */
  {
    content: `PHCTrbi0cn0A3I_eE3g2Gr9WnsFMsvtKRxVP8ghfCfM`,
    name: `google-site-verification`,
  },
]

/** @type {import('@docusaurus/preset-classic').ThemeConfig['navbar']} */
const navbar = {
  hideOnScroll: true,
  items: [
    {
      docId: `index`,
      docsPluginId: `guides`,
      label: `Guides`,
      position: `left`,
      type: `doc`,
    },
    {
      href: `/docs/config`,
      label: `Docs`,
      position: `left`,
    },
    {
      docId: `index`,
      docsPluginId: `extensions`,
      label: `Extensions`,
      position: `left`,
      type: `doc`,
    },
    {
      items: [
        {label: `latest`, to: `/releases/tags/6-13`},
        {label: `6.12`, to: `/releases/tags/6-12`},
        {label: `6.11`, to: `/releases/tags/6-11`},
        {label: `6.9`, to: `/releases/tags/6-9`},
        {label: `6.8`, to: `/releases/tags/6-8`},
        {label: `6.7`, to: `/releases/tags/6-7`},
        {label: `6.6`, to: `/releases/tags/6-6`},
        {label: `6.5`, to: `/releases/tags/6-5`},
        {label: `6.4`, to: `/releases/tags/6-4`},
      ],
      label: `Releases`,
      position: `left`,
      to: `/releases`,
    },
    {
      className: `header-github-link`,
      href: `/dev`,
      label: `Dev`,
      position: `right`,
    },
    {
      className: `header-discourse-link`,
      href: config.url.discourse,
      label: `Community`,
      position: `right`,
    },
    {
      'aria-label': `GitHub repository`,
      className: `header-github-link`,
      href: config.url.web,
      label: `GitHub`,
      position: `right`,
    },
  ],
  logo: {
    alt: config.name,
    src: config.logo,
  },
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
