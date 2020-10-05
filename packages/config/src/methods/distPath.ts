import {Config} from '..'

export const distPath: Config.DistPath = function (
  segment: string,
) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.store['args'].output) {
    return this
  }

  this.store.set(
    'build',
    'output.path',
    this.hooks.filter('api.distPath', this.project(segment)),
  )

  return this
}
