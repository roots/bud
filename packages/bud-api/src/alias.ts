import {Api} from '@roots/bud-typings'

export const alias: Api.Alias = function (alias) {
  this.config.has('resolve.alias')
    ? this.config.mutate('resolve.alias', cfg => ({
        ...cfg,
        ...alias,
      }))
    : this.config.set('resolve.alias', alias)

  return this
}
