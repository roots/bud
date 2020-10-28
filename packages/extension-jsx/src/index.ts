import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export const registerLoader = [
  '@svgr',
  require.resolve('@svgr/webpack'),
]

export const boot = (instance: Framework.Bud): void => {
  const {options} = instance.build.items['babel'].make()

  Object.assign(instance.build.items['babel'].options, {
    presets: [
      ...options.presets,
      [require.resolve('@babel/preset-react')],
    ],
  })

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

  Object.assign(instance.build.items['babel'].options, {
    plugins: [
      ...options.plugins,
      instance.mode.is('development') &&
        require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  })
}
