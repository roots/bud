export const distPath: Framework.API.DistPath = function (
  this: Framework.Bud,
  segment: string,
) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.args.dist) return this

  this.config.set('output.path', this.project(segment))

  return this
}
