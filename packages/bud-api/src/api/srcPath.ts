export const srcPath: Framework.API.SrcPath = function (
  this: Framework.Bud,
  segment: string,
) {
  /** Bounce early if src is overwritten from CLI */
  if (this.args.src) return this

  this.config.set('context', this.project(segment))

  return this
}
