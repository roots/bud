import {Config} from '..'

export const alias: Config.Alias = function (aliases) {
  const webpack = this.store.use('webpack')

  webpack.set('resolve.alias', {
    ...webpack.get('resolve.alias'),
    aliases,
  })

  return this
}
