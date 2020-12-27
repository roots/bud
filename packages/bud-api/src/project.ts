import {Api} from '@roots/bud-typings'

export const project: Api.Project = function (segment) {
  return segment
    ? this.fs.path.join(this.fs.getBase(), segment)
    : this.fs.getBase() ?? process.cwd()
}
