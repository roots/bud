import type {Bud} from '@roots/bud-typings'

export const alias: Alias = function (alias) {
  this.config.getEntries('resolve.alias').length > 1
    ? this.config.mutate('resolve.alias', cfg => ({
        ...cfg,
        ...alias,
      }))
    : this.config.set('resolve.alias', alias)

  return this
}

export type Alias<T = Bud.Contract> = (
  this: T,
  aliases: {
    [key: string]: string
  },
) => T
