import {Api} from '@roots/bud-typings'

export const publicPath: Api.PublicPath = function (publicPath) {
  this.config.set(
    'output.publicPath',
    this.fs.path.normalize(`/${publicPath}/`),
  )

  return this
}
