import type {Framework} from '@roots/bud-typings'

export const srcPath: SrcPath = function (segment) {
  /** Bounce early if src is overwritten from CLI */
  if (this.args.isString('src')) return this

  this.config.set('context', this.project(segment))

  return this
}

export type SrcPath = (
  this: Framework,
  segment: string,
) => Framework
