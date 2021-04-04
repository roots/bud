import Plugin from 'css-minimizer-webpack-plugin'
import {Module} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      'css-minimizer-webpack-plugin': typeof Plugin
    }
  }
}

const DEFAULT_OPTIONS = {
  minimizerOptions: {
    preset: [
      'default',
      {
        discardComments: {removeAll: true},
      },
    ],
  },
}

export const name: Module['name'] =
  'css-minimizer-webpack-plugin'

export const boot: Module['boot'] = ({
  hooks,
  store,
  subscribe,
}) => {
  hooks
    .on(
      'extension/css-minimizer-webpack-plugin/options',
      () => DEFAULT_OPTIONS,
    )

    .hooks.on(
      'build/optimization/minimizer',
      (
        minimizer: Webpack.Configuration['optimization']['minimizer'],
      ) => [
        ...(minimizer ?? []),
        ...(store.enabled('options.minimize')
          ? [
              new Plugin(
                subscribe(
                  'extension/css-minimizer-webpack-plugin/options',
                ),
              ),
            ]
          : []),
      ],
    )
}
