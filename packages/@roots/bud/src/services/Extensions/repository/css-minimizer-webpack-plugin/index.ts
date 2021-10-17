import {Plugin} from './css-minimizer-webpack-plugin.dependencies'
import {Extension} from './css-minimizer-webpack-plugin.interface'

const BudCssMinimizerWebpackPlugin: Extension.CompilerPlugin<
  typeof Plugin,
  any
> = {
  name: 'css-minimizer-webpack-plugin',

  options: ({store}) =>
    store.get('extension.cssMinimizerWebpackPlugin'),

  boot: ({extensions, hooks, isProduction, store}) => {
    isProduction &&
      store.isTrue('minimize') &&
      extensions.has('css-minimizer-webpack-plugin') &&
      extensions.get('css-minimizer-webpack-plugin')?.options &&
      hooks.on('build/optimization/minimizer', minimizer => [
        ...minimizer,
        new Plugin(
          extensions.get('css-minimizer-webpack-plugin').options,
        ),
      ])
  },
}

export const {name, options, boot} = BudCssMinimizerWebpackPlugin
