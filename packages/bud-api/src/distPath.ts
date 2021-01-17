import {Api} from '@roots/bud-typings'

export const distPath: Api.DistPath = function (segment) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.store.isString('args.dist')) return this

  this.options.set('dist', segment)

  return this
}
