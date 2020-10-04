import {Config} from '..'

export const distPath: Config.DistPath = function (segment) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.store.args.build) {
    return this
  }

  this.store.build.output.path = this.hooks.filter(
    'api.distPath',
    this.fs.path.resolve(this.store.paths.project, segment),
  )

  return this
}
