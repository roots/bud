import {Api} from '@roots/bud-typings'

export const publicPath: Api.PublicPath = function (publicPath) {
  this.options.set(
    'publicPath',
    this.disk.path.normalize(publicPath),
  )

  return this
}
