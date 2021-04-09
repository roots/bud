import type {Module} from '@roots/bud-framework'
import type Webpack from 'webpack'

import Plugin from 'css-minimizer-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      'css-minimizer-webpack-plugin': Plugin
    }
  }
}

export const options: Module['options'] = () => ({
  minimizerOptions: {
    preset: ['default'],
  },
})

export const name: Module['name'] =
  'css-minimizer-webpack-plugin'

/**
 * This plugin does not apply to Webpack.Plugins. So,
 * the boot event is used instead.
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
