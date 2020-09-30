import Bud from '@roots/bud-types'

export const src: Bud.Config.Src = function (path?) {
  return path
    ? this.fs.path.resolve(this.paths.get('src'), path)
    : this.paths.get('src')
}
