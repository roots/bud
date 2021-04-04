import Plugin from 'css-minimizer-webpack-plugin'
import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      'css-minimizer-webpack-plugin': typeof Plugin
    }
  }
}

export const name = 'css-minimizer-webpack-plugin'

export const options = () => ({
  minimizerOptions: {
    preset: [
      'default',
      {
        discardComments: {removeAll: true},
      },
    ],
  },
})

export const boot: Module['boot'] = app => {
  app.hooks.on('build/optimization/minimizer', minimizer => [
    ...(minimizer ?? []),
    ...(app.store.enabled('options.minimize')
      ? [
          new Plugin(
            app.subscribe(
              'extension/css-minimizer-webpack-plugin/options',
            ),
          ),
        ]
      : []),
  ])
}
