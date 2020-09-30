import Bud from '@roots/bud-types'

export const dist: Bud.Config.Dist = function (path?: string) {
  return path
    ? this.fs.path.resolve(this.paths.get('dist'), path)
    : this.paths.get('dist')
}
