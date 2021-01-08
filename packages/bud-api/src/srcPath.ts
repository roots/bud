import {Api} from '@roots/bud-typings'

export const srcPath: Api.SrcPath = function (segment) {
  /** Bounce early if src is overwritten from CLI */
  if (this.store.isString('args.src')) return this

  this.store.set('webpack.context', this.project(segment))

  return this
}
