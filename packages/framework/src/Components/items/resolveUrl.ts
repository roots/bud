export const ident: Build.Item['ident'] = 'file'

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('resolve-url-loader')

export const options: Build.Item['options'] = {
  root: '',
  sourceMap: true,
}
