export const distPath: API.DistPath = function (
  segment: string,
) {
  const build = this.store.use('build')

  /** Bounce early if dist is overwritten from CLI */
  if (this.store['args'].get('output')) {
    return this
  }

  build.set(
    'output.path',
    this.hooks.filter('api.distPath', this.project(segment)),
  )

  return this
}
