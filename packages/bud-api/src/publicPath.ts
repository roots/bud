import {Api} from '@roots/bud-typings'

export const publicPath: Api.PublicPath = function (publicPath) {
  this.store.set(
    'webpack.output.publicPath',
    this.disk.path.normalize(`/${publicPath}/`),
  )

  return this
}
