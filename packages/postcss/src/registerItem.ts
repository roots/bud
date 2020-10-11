import autoprefixer from 'autoprefixer'

/**
 * PostCSS ident
 */
export const ident: Build.Item['ident'] = 'postcss'

/**
 * PostCSS loader
 */
export const loader: Build.Item['loader'] = loaders =>
  loaders.get('postcss-loader')

/**
 * PostCSS options
 */
export const options: Build.Item['options'] = {
  plugins: {
    autoprefixer: [autoprefixer, {}],
  },
  sourceMapOptions: null,
  syntax: null,
  parser: null,
  stringifier: null,
}
