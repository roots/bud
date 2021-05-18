import {Module} from '@roots/bud-framework'
import MiniCssExtractPlugin, {
  PluginOptions,
} from 'mini-css-extract-plugin'

const extension: Module<MiniCssExtractPlugin, PluginOptions> = {
  name: 'mini-css-extract-plugin',
  options: ({store}) => ({
    filename: store.isTrue('hash')
      ? `${store.get('hashFormat')}.css`
      : `${store.get('fileFormat')}.css`,
    chunkFilename: store.isTrue('hash')
      ? `${store.get('hashFormat')}.[id].css`
      : `${store.get('fileFormat')}.[id].css`,
    ...(store.get('extension.miniCssExtractPlugin') ?? {}),
  }),
  make: options => new MiniCssExtractPlugin(options.all()),
  when: ({isProduction}) => isProduction,
}

export {extension as default}
export const {name, options, make, when} = extension
