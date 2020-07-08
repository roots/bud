module.exports = {
  title: '@roots/bud-support',
  url: 'https://roots.github.io/bud-support',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'roots', // Usually your GitHub org/user name.
  projectName: 'bud-support', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '@roots/bud-support',
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/roots/bud-support',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          homePageId: 'index',
          editUrl:
            'https://github.com/roots/bud-support/edit/master/docs',
        },
      },
    ],
  ],
};
