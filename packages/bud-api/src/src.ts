import {Api} from '@roots/bud-typings'

export const src: Api.Src = function (segment?) {
  return segment
    ? this.disk.path.join(
        this.options.access('project'),
        segment,
      )
    : this.disk.path.join(
        this.options.access('project'),
        this.options.access('src'),
      )
}
