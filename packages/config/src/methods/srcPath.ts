import {Config} from '..'

export const srcPath: Config.SrcPath = function (
  segment: string,
) {
  if (this.store['args'].get('src')) {
    return this
  }

  this.store['paths'].set(
    'src',
    this.fs.path.resolve(
      this.store['paths'].get('project'),
      segment,
    ),
  )

  return this
}
