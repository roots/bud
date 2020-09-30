import Bud from '@roots/bud-types'

export const srcPath: Bud.Config.SrcPath = function (
  this: Bud,
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
