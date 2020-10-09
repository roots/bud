export const ident: Build.Item['ident'] = 'style-loader'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('style-loader')
