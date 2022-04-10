import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import type {Plugin} from './mini-css-extract-plugin.interface'

export const label: Plugin['label'] = 'mini-css-extract-plugin'

export const options: Plugin['options'] = ({store, isProduction}) => ({
  filename:
    store.is('features.hash', true) && isProduction
      ? store.get('hashFormat').concat('.css')
      : store.get('fileFormat').concat('.css'),

  chunkFilename:
    store.is('features.hash', true) && isProduction
      ? store.get('hashFormat').concat('.css')
      : store.get('fileFormat').concat('.css'),
})

export const make: Plugin['make'] = options =>
  new MiniCssExtractPlugin(options.all())

export const when: Plugin['when'] = ({isProduction}) => isProduction
