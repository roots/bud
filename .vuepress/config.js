const {description} = require('../package')

module.exports = {
  title: '@roots/bud',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    repo: 'roots/bud-support',
    editLinks: false,
    docsDir: 'bud/docs',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'API',
        link: '/bud/docs/globals'
      },
    ],
    sidebar: {
      '/docs/globals/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
