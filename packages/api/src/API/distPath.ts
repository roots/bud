export const distPath: Framework.API.DistPath = function (
  this: Framework.Bud,
  segment: string,
) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.args.output) return this

  this.build.config.set('output.path', this.project(segment))

  return this
}
