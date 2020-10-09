export const ident: Build.Item['ident'] = 'css-loader'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('css-loader')

export const options: Build.Item['options'] = {
  importLoaders: 1,
}
