import {Module} from '@roots/bud-framework'
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

type Extension = Module<typeof CssMinimizerPlugin, any>

const extension: Extension = {
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
        new CssMinimizerPlugin(
          extensions.get('css-minimizer-webpack-plugin').options,
        ),
      ])
  },
}

export default extension
export const {name, options, boot} = extension
