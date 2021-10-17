import type {Extension} from '@roots/bud-framework'
import type MiniCssExtractPlugin from 'mini-css-extract-plugin'

type Plugin = Extension.CompilerPlugin<
  MiniCssExtractPlugin,
  MiniCssExtractPlugin.PluginOptions
>

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
