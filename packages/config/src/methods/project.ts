import {Config} from '..'

export const project: Config.Project = function (path) {
  return path
    ? this.fs.path.join(this.store['paths'].get('project'), path)
    : this.store['paths'].get('project')
}
