import Bud from '@roots/bud-types'

export const src: Bud.Config.Src = function (path?) {
  return path
    ? this.fs.path.resolve(this.store['paths'].get('src'), path)
    : this.store['paths'].get('src')
}
