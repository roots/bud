import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

/**
 * @svgr loader
 */
export const registerLoader = [
  '@svgr',
  require.resolve('@svgr/webpack'),
]

/**
 * Boot bud-jsx extension
 */
export const boot = (instance: Framework.Bud): void => {
  if (!instance.mode.is('development')) return

  instance.extensions.register('react-reresh-webpack-plugin', {
    options: {
      overlay: {
        sockIntegration: 'whm',
      },
    },
    make: (opts: ReactRefreshPlugin['options']) =>
      new ReactRefreshPlugin(opts),
    when: instance => instance.mode.is('development'),
  })

  instance.build.items.merge('babel.options.presets', [
    require.resolve('@babel/preset-react'),
  ])
  instance.build.items.merge('babel.options.plugins', [
    require.resolve('react-refresh/babel'),
  ])
}
