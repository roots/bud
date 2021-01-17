import {Api} from '@roots/bud-typings'

export const alias: Api.Alias = function (alias) {
  this.hooks.on('webpack.resolve.alias', aliases => ({
    ...aliases,
    ...alias,
  }))

  return this
}
