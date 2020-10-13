export const distPath: Api.DistPath = function (
  segment: string,
) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.args.output) return this

  this.build.config.set(
    'output.path',
    this.hooks.filter('api.distPath', this.project(segment)),
  )

  return this
}
