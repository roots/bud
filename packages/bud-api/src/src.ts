import {Api} from '@roots/bud-typings'

export const src: Api.Src = function (segment?) {
  return segment
    ? this.disk.path.resolve(
        this.store.get('webpack.context'),
        segment,
      )
    : this.store.get('webpack.context')
}
