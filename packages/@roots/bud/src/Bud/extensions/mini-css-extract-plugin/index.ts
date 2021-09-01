import type {
  Framework,
  WebpackPlugin,
} from '@roots/bud-framework'
import {Container} from '@roots/container'
import type MiniCssExtractPlugin from 'mini-css-extract-plugin'

interface Plugin
  extends WebpackPlugin<
    MiniCssExtractPlugin,
    MiniCssExtractPlugin.PluginOptions
  > {
  name: 'mini-css-extract-plugin' & WebpackPlugin['name']
  options: (
    app: Framework,
  ) => MiniCssExtractPlugin.PluginOptions &
    WebpackPlugin['options']
  make: ((
    options: Container<MiniCssExtractPlugin.PluginOptions>,
  ) => MiniCssExtractPlugin) &
    WebpackPlugin['make']
  when: ((app: Framework) => boolean) & WebpackPlugin['when']
}

export const name: Plugin['name'] = 'mini-css-extract-plugin'

export const options: Plugin['options'] = ({store}) => ({
  filename: store.isTrue('hash')
    ? `${store.get('hashFormat')}.css`
    : `${store.get('fileFormat')}.css`,

  chunkFilename: store.isTrue('hash')
    ? `${store.get('hashFormat')}.[id].css`
    : `${store.get('fileFormat')}.[id].css`,
  ...(store.get('extension.miniCssExtractPlugin') ?? {}),
})

export const make: Plugin['make'] = options =>
  new (require('mini-css-extract-plugin'))(options.all())

export const when: Plugin['when'] = ({isProduction}) =>
  isProduction
