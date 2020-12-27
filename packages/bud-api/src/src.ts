import {Api} from '@roots/bud-typings'

export const src: Api.Src = function (segment?) {
  return segment
    ? this.fs.path.resolve(this.config.get('context'), segment)
    : this.config.get('context')
}
