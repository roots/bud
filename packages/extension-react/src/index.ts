import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

/**
 * Boot bud-jsx extension
 */
export const boot = (bud: Framework.Bud): void => {
  /** Add babel preset */
  bud.build.items.merge('babel.options.presets', [
    '@babel/preset-react',
  ])

  /** Everything else is dev only */
  if (!bud.mode.is('development')) return

  /** Add react-refresh webpack plugin */
  bud.extensions.set('react-reresh', {
    options: {
      overlay: {
        sockIntegration: 'whm',
      },
    },
    make: (opts: RefreshOptions) => new ReactRefreshPlugin(opts),
    when: bud => bud.mode.is('development'),
  })

  /** Add react-refresh babel plugin */
  bud.build.items.merge('babel.options.plugins', [
    require.resolve('react-refresh/babel'),
  ])
}

/**
 * @svgr loader
 */
export const registerLoader = [
  '@svgr-loader',
  require.resolve('@svgr/webpack'),
]

export const registerItem = [
  '@svgr',
  {
    test: ({patterns}: Framework.Bud): RegExp =>
      patterns.get('svg'),
    use: ['@svgr-loader'],
  },
]

export type RefreshOptions = ReactRefreshPlugin['options']
