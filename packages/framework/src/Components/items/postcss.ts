export const ident: Build.Item['ident'] = 'postcss-loader'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('postcss-loader')
