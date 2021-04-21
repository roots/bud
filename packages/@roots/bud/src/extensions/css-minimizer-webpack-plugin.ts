import {Module} from '@roots/bud-framework'
import Webpack from 'webpack'
import Plugin from 'css-minimizer-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      'css-minimizer-webpack-plugin': Plugin
    }
  }
}

export const options: Module['options'] = app =>
  app.store.get('extension.cssMinimizerWebpackPlugin')

export const name: Module['name'] =
  'css-minimizer-webpack-plugin'

/**
 * This plugin is not applied to {Webpack.Plugins}.
 *
 * So, the boot event is used instead.
 */
export const boot: Module['boot'] = ({extensions, hooks}) => {
  hooks.on(
    'build/optimization/minimizer',
    (
      minimizer: Webpack.Configuration['optimization']['minimizer'],
    ) => {
      if (hooks.filter('build/minimizer/minimize')) {
        return minimizer
      }

      return [
        ...(minimizer ?? []),
        new Plugin(
          extensions.get('css-minimizer-webpack-plugin').options,
        ),
      ]
    },
  )
}
