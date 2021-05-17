import {Module} from '@roots/bud-framework'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

type Extension = Module<CssMinimizerPlugin, any>

const extension: Extension = {
  name: 'css-minimizer-webpack-plugin',
  options: ({store}) =>
    store.get('extension.cssMinimizerWebpackPlugin'),
  boot: ({extensions, hooks}) => {
    hooks.on('build/optimization/minimizer', minimizer => {
      return [
        ...(minimizer ?? []),
        new CssMinimizerPlugin(
          extensions.get('css-minimizer-webpack-plugin').options,
        ),
      ]
    })
  },
}

export const {name, options, boot} = extension
