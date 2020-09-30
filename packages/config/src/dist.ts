import Bud from '@roots/bud-types'

export const dist: Bud.Config.Dist = function (path?: string) {
  return path
    ? this.fs.path.resolve(this.store['paths'].get('dist'), path)
    : this.store['paths'].get('dist')
}
