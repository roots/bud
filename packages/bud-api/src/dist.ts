import {Api} from '@roots/bud-typings'

export const dist: Api.Dist = function (path?) {
  return path
    ? this.fs.path.join(this.config.get('output.path'), path)
    : this.config.get('output.path')
}
