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
  /**
   * Existing babel rules.
   */
  const {options} = instance.build.items['babel'].make()

  /**
   * React babel preset
   */
  instance.build.items['babel'].setOptions({
    ...options,
    presets: [
      ...options.presets,
      [require.resolve('@babel/preset-react')],
    ],
  })

  /**
   * react-refresh webpack plugin
   */
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

  /**
   * react-refresh babel plugin.
   */
  Object.assign(instance.build.items['babel'].options, {
    plugins: [
      ...options.plugins,
      instance.mode.is('development') &&
        require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  })
}
