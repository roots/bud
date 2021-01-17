import {Api} from '@roots/bud-typings'

export const srcPath: Api.SrcPath = function (segment) {
  /** Bounce early if src is overwritten from CLI */
  if (
    this.store.has('args.src') &&
    this.store.isString('args.src')
  )
    return this

  this.options.set('src', segment)

  return this
}
