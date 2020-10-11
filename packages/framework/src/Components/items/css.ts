export const ident: Build.Item['ident'] = 'css'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('css-loader')

export const options: Build.Item['options'] = {
  importLoaders: 1,
}
