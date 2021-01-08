import {Api} from '@roots/bud-typings'

export const alias: Api.Alias = function (alias) {
  this.store.get('config').has('resolve.alias')
    ? this.store.mutate('webpack.resolve.alias', cfg => ({
        ...cfg,
        ...alias,
      }))
    : this.store.set('webpack.resolve.alias', alias)

  return this
}
