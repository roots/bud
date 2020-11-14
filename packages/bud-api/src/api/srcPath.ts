import {Bud} from '@roots/bud-typings'

export const srcPath = function (
  this: Bud.Contract,
  segment: string,
): Bud.Contract {
  /** Bounce early if src is overwritten from CLI */
  if (this.args.src) return this

  this.config.set('context', this.project(segment))

  return this
}
