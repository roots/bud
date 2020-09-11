import {
  Bud,
  Plugin,
  WebpackRule,
  RuleSetLoader,
} from '@roots/bud-types'

const react: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    this.bud.options.set('babel.presets', [
      ...this.bud.options.get('babel.presets'),
      require.resolve('@babel/preset-react'),
    ])

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
          bud.uses.get('babel-loader'),
          bud.uses.get('svgr'),
          bud.uses.get('url-loader'),
        ],
      }),
    )

    !this.bud.options
      .get('webpack.resolve.extensions')
      .includes('.jsx') && this.bud.addExtensions(['jsx'])
  },
})

export {react}
