import {Api} from '@roots/bud-typings'

export const project: Api.Project = function (segment) {
  return segment
    ? this.disk.path.join(this.disk.baseDir, segment)
    : this.disk.baseDir ?? process.cwd()
}
