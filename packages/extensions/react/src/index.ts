import Bud from '@roots/bud-types'

const react: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    this.bud.addExtensions(['jsx'])

    this.build.loaders.babel.options.presets = [
      ...this.build.loaders.babel.options.presets,
      require.resolve('@babel/preset-react'),
    ]

    this.build.loaders.svgr = require.resolve('@svgr/webpack')

    this.build.rules.svgr = (bud: Bud) => ({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: bud.patterns.get('js'),
      use: [
        bud.build.loaders.babel,
        bud.build.loaders.svgr,
        bud.build.loaders.resolve,
      ],
    })
  },
})

module.exports = react
