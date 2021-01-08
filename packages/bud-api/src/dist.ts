import {Api} from '@roots/bud-typings'

export const dist: Api.Dist = function (path?) {
  return path
    ? this.disk
        .get('project')
        .path.join(this.store.get('webpack.output.path'), path)
    : this.store.get('webpack.output.path')
}
