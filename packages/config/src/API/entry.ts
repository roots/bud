import Webpack from 'webpack'

export const entry: API.Entry = function (
  name: string,
  assets: string | string[] | Webpack.Entry | Webpack.EntryFunc,
) {
  this.store.use('build').merge('entry', {
    [name]: assets,
  })

  return this
}
