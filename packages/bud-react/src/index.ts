import {
  Bud,
  Plugin,
  WebpackRule,
  RuleSetLoader,
} from '@roots/bud-types'

const react: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    this.bud.addExtensions(['jsx'])

    this.bud.options.set('babel', {
      ...this.bud.options.get('babel'),
      presets: [
        ...this.bud.options.get('babel.presets'),
        require.resolve('@babel/preset-react'),
      ],
    })

    this.bud.loaders.set(
      'svgr',
      require.resolve('@svgr/webpack'),
    )

    this.bud.uses.set(
      'svgr',
      (bud: Bud): RuleSetLoader => ({
        loader: bud.loaders.get('svgr'),
      }),
    )

    this.bud.rules.set(
      'svgr',
      (bud: Bud): WebpackRule => ({
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: bud.patterns.get('js'),
        use: [
          bud.uses.get('babel'),
          bud.uses.get('svgr'),
          bud.uses.get('resolveUrl'),
        ],
      }),
    )
  },
})

module.exports = react
