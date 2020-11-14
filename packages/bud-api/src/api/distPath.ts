import {Bud} from '@roots/bud-typings'

export const distPath = function (
  this: Bud.Contract,
  segment: string,
): Bud.Contract {
  /** Bounce early if dist is overwritten from CLI */
  if (this.args.dist) return this

  this.config.set('output.path', this.project(segment))

  return this
}
