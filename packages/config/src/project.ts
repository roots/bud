import Bud from '@roots/bud-types'

export const project: Bud.Config.Project = function (path) {
  return path
    ? this.fs.path.join(this.paths.get('project'), path)
    : this.paths.get('project')
}
