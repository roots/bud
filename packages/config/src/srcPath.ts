import Bud from '@roots/bud-types'

export const srcPath: Bud.Config.SrcPath = function (
  this: Bud,
  segment: string,
) {
  if (this.args.get('src')) {
    return this
  }

  this.paths.set(
    'src',
    this.fs.path.resolve(this.paths.get('project'), segment),
  )

  return this
}
