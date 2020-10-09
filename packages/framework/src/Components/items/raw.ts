export const ident: Build.Item['ident'] = 'raw-loader'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('raw-loader')
