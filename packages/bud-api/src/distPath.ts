import {Api} from '@roots/bud-typings'

export const distPath: Api.DistPath = function (segment) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.args.isString('dist')) return this

  this.config.set('output.path', this.project(segment))

  return this
}
