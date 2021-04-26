import {Framework, Module} from '@roots/bud-framework'
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
export const boot: Module['boot'] = ({
  extensions,
  hooks,
}: Framework) => {
  hooks.on('build/optimization/minimizer', minimizer => {
    return [
      ...(minimizer ?? []),
      new Plugin(
        extensions.get('css-minimizer-webpack-plugin').options,
      ),
    ]
  })
}
