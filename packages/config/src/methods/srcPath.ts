import {Config} from '..'

export const srcPath: Config.SrcPath = function (
  segment: string,
) {
  if (this.store.args.build) {
    return this
  }

  this.store['build'].context = this.hooks.filter(
    'api.distPath',
    this.fs.path.resolve(this.store['paths'].project, segment),
  )

  return this
}
