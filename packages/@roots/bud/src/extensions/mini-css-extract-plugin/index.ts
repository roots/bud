import {MiniCssExtractPlugin} from './mini-css-extract-plugin.dependencies'
import type {Plugin} from './mini-css-extract-plugin.interface'

export const name: Plugin['name'] = 'mini-css-extract-plugin'

export const options: Plugin['options'] = ({
  store,
  isProduction,
}) => ({
  filename:
    store.is('features.hash', true) && isProduction
      ? `${store.get('hashFormat')}.css`
      : `${store.get('fileFormat')}.css`,

  chunkFilename:
    store.is('features.hash', true) && isProduction
      ? `${store.get('hashFormat')}.css`
      : `${store.get('fileFormat')}.css`,

  ...(store.get('extension.mini-css-extract-plugin') ?? {}),
})

export const make: Plugin['make'] = options =>
  new MiniCssExtractPlugin(options.all())

export const when: Plugin['when'] = ({isProduction}) =>
  isProduction
