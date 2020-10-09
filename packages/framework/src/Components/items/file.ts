export const ident: Build.Item['ident'] = 'file-loader'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('file-loader')

export const options: Build.Item['options'] = {
  name: '[path][name].[ext]',
}

export const query: Build.Item['query'] = undefined
