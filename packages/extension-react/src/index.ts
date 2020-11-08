import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

/**
 * Boot bud-jsx extension
 */
export const boot = (instance: Framework.Bud): void => {
  /** Add babel preset */
  instance.build.items.merge('babel.options.presets', [
    require.resolve('@babel/preset-react'),
  ])

  /** Everything else is dev only */
  if (!instance.mode.is('development')) return

  /** Add react-refresh webpack plugin */
  instance.extensions.register('react-reresh', {
    options: {
      overlay: {
        sockIntegration: 'whm',
      },
    },
    make: (opts: RefreshOptions) => new ReactRefreshPlugin(opts),
    when: instance => instance.mode.is('development'),
  })

  /** Add react-refresh babel plugin */
  instance.build.items.merge('babel.options.plugins', [
    require.resolve('react-refresh/babel'),
  ])
}

/**
 * @svgr loader
 */
export const registerLoader = [
  '@svgr',
  require.resolve('@svgr/webpack'),
]

export const registerItem = [
  '@svgr',
  {
    test: ({patterns}: Framework.Bud): RegExp =>
      patterns.get('svg'),
    use: ['@svgr'],
  },
]

export type RefreshOptions = ReactRefreshPlugin['options']
