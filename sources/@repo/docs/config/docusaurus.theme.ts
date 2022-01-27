import dracula from 'prism-react-renderer/themes/dracula'
import github from 'prism-react-renderer/themes/github'

import {config} from '../../../../config/monorepo.config'

export const announcementBar = {
  id: 'announcementBar-2', // Increment on change
  content: `🧹 We're working hard to get the docs up to date with Bud v5. Thanks for your understanding!`,
}

export const footer = {
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

export const navbar = {
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
    {to: '/blog', label: 'Blog', position: 'left'},
    {
      href: '/releases',
      label: 'Releases',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'Release notes',
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

export const prism = {
  additionalLanguages: ['php'],
  darkTheme: dracula,
  theme: github,
}
