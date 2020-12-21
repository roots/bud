import type {Framework} from '@roots/bud-typings'

export const alias: Alias = function (alias) {
  this.config.has('resolve.alias')
    ? this.config.mutate('resolve.alias', cfg => ({
        ...cfg,
        ...alias,
      }))
    : this.config.set('resolve.alias', alias)

  return this
}

export type Alias = (
  this: Framework,
  aliases: {
    [key: string]: string
  },
) => Framework
