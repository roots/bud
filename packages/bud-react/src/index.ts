import {Bud, Plugin} from '@roots/bud-types'

const react: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    this.bud.addExtensions(['jsx'])

    this.bud.loaders.set('babel.options.presets', [
      ...this.bud.loaders.get('babel.options.presets'),
      require.resolve('@babel/preset-react'),
    ])

    this.bud.loaders.set('svgr', {
      loader: require.resolve('@svgr/webpack'),
    })

    this.bud.rules.set('svgr', (bud: Bud) => ({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: bud.patterns.get('js'),
      use: [
        bud.loaders.get('babel'),
        bud.loaders.get('svgr'),
        bud.loaders.get('resolveUrl'),
      ],
    }))
  },
})

module.exports = react
