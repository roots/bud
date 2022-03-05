import {Config} from '@docusaurus/types'
import dracula from 'prism-react-renderer/themes/dracula'
import github from 'prism-react-renderer/themes/github'

import {config} from '../../../../config/monorepo.config'

/**
 * Announcement bar config
 *
 * @public
 */
export const announcementBar: Config['themeConfig']['announcementBar'] = {
  id: 'announcementBar-2', // Increment on change
  content: `🧹 We're working hard to get the docs up to date with Bud v5. Thanks for your understanding!`,
}

/**
 * Footer config
 *
 * @public
 */
export const footer: Config['themeConfig']['footer'] = {
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
export const metadata: Config['themeConfig']['metadata'] = [
  {
    name: 'google-site-verification',
    content: 'PHCTrbi0cn0A3I_eE3g2Gr9WnsFMsvtKRxVP8ghfCfM',
  },
]

/**
 * Navbar config
 *
 * @public
 */
export const navbar: Config['themeConfig']['navbar'] = {
  hideOnScroll: true,
  logo: {
    alt: config.name,
    src: config.logo,
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
export const prism: Config['themeConfig']['prism'] = {
  additionalLanguages: ['php'],
  darkTheme: dracula,
  theme: github,
}
