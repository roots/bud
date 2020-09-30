import Bud from '@roots/bud-types'

const react: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    this.bud.addExtensions(['jsx'])

    this.bud.store['loaders'].set('babel.options.presets', [
      ...this.bud.store['loaders'].get('babel.options.presets'),
      require.resolve('@babel/preset-react'),
    ])

    this.bud.store['loaders'].set('svgr', {
      loader: require.resolve('@svgr/webpack'),
    })

    this.bud.store['rules'].set('svgr', (bud: Bud) => ({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: bud.patterns.get('js'),
      use: [
        bud.loaders.get('babel'),
        bud.loaders.get('svgr'),
        bud.loaders.get('resolve-url'),
      ],
    }))
  },
})

module.exports = react
