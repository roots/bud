export const ident: Build.Item['ident'] = 'minicss'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('minicss-loader')
