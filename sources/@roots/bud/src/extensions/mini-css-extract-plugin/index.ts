import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import type {Plugin} from './mini-css-extract-plugin.interface'

export const label: Plugin['label'] = 'mini-css-extract-plugin'

export const options: Plugin['options'] = ({hooks, isProduction}) => ({
  filename:
    hooks.filter('feature.hash') && isProduction
      ? hooks.filter('value.hashFormat').concat('.css')
      : hooks.filter('value.fileFormat').concat('.css'),

  chunkFilename:
    hooks.filter('feature.hash') && isProduction
      ? hooks.filter('value.hashFormat').concat('.css')
      : hooks.filter('value.fileFormat').concat('.css'),
})

export const make: Plugin['make'] = options =>
  new MiniCssExtractPlugin(options.all())

export const when: Plugin['when'] = ({isProduction}) => isProduction
