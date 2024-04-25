const {themes} = require(`prism-react-renderer`)
const config = require(`../../../../config/monorepo.config.cjs`)
const releaseData = require(`../generated/releases/data.json`)

/**
 * Color mode
 */
const colorMode = {
  disableSwitch: true,
  respectPrefersColorScheme: true,
}

/**
 * Footer config
 */
const footer = {
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
      docId: `getting-started/index`,
      docsPluginId: `learn`,
      label: `Learn`,
      position: `left`,
      type: `doc`,
    },
    {
      href: `/reference/bud.after`,
      label: `Reference`,
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
      items: releaseData.reduce((items, release) => {
        if (!items.length) {
          return [
            ...items,
            {label: `Latest`, to: `/releases/${release.semver}`},
          ]
        }

        if (release.patch !== 0) return items

        const useTag = releaseData.some(
          ({major, minor, patch}) =>
            major == release.major &&
            minor == release.minor &&
            patch !== 0,
        )

        return [
          ...items,
          {
            label: release.semver,
            to: useTag
              ? `/releases/tags/${release.major}-${release.minor}`
              : `/releases/${release.major}.${release.minor}.${release.patch}`,
          },
        ]
      }, []),
      label: `Releases`,
      position: `left`,
      to: `/releases`,
    },
    {
      'aria-label': `Discourse`,
      className: `header-discourse-link`,
      href: config.url.discourse,
      label: ` `,
      position: `right`,
    },
    {
      'aria-label': `GitHub`,
      className: `header-github-link`,
      href: config.url.web,
      label: ` `,
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
  darkTheme: themes.dracula,
  theme: themes.dracula,
}

module.exports = {
  colorMode,
  footer,
  metadata,
  navbar,
  prism,
}
