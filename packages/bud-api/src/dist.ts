import {Api} from '@roots/bud-typings'

export const dist: Api.Dist = function (path?) {
  return path
    ? this.disk.path.join(
        this.options.access('project'),
        this.options.access('dist'),
        path,
      )
    : this.disk.path.join(
        this.options.access('project'),
        this.options.access('dist'),
      )
}
