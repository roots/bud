import {Bud} from '@roots/bud-typings'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

/**
 * Boot bud-jsx extension
 */
export const boot = (bud: Bud.Contract): void => {
  // Add babel preset
  bud.build.items.set('babel.options.presets', [
    '@babel/preset-react',
  ])

  /**
   * Everything else is dev only
   */
  if (!bud.mode.is('development')) return

  // Add react-refresh webpack plugin
  bud.extensions.set('react-reresh', {
    make: opts => new ReactRefreshPlugin(opts.getStore()),
    when: bud => bud.mode.is('development'),
    options: {
      overlay: {
        sockIntegration: 'whm',
      },
    },
  })

  // Add react-refresh babel plugin
  bud.build.items.set('babel.options.plugins', [
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
    test: ({patterns}: Bud.Contract): RegExp =>
      patterns.get('svg'),
    use: ['@svgr-loader'],
  },
]

export type RefreshOptions = ReactRefreshPlugin['options']
