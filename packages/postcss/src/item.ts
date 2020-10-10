import * as Build from '@roots/bud-framework/src/types/Build'
import autoprefixer from 'autoprefixer'

export const ident: Build.Item['ident'] = 'postcss'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('postcss-loader')

export const options: Build.Item['options'] = {
  plugins: {
    autoprefixer: [autoprefixer, {}],
  },
  sourceMapOptions: null,
  syntax: null,
  parser: null,
  stringifier: null,
}
