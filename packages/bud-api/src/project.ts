import {Api} from '@roots/bud-typings'

export const project: Api.Project = function (segment?) {
  return segment
    ? this.disk.path.join(this.options.get('project'), segment)
    : this.options.get('project')
}
