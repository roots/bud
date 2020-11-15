import type {Bud} from '@roots/bud-typings'

/**
 * ### bud.alias
 *
 * > Register shorthand for resolving modules
 * using webpack aliases. Useful for
 * situations that may otherwise require
 * brittle relative paths.
 *
 * ```js
 * bud.alias({
 *   '@scripts': bud.src('scripts'),
 * })
 * ```
 *
 * @see {{Docs: /alias}}
 */
export const alias: Alias = function (alias) {
  this.config.getEntries('resolve.alias').length > 1
    ? this.config.mutate('resolve.alias', cfg => ({
        ...cfg,
        ...alias,
      }))
    : this.config.set('resolve.alias', alias)

  return this
}

export type Alias = (
  this: Bud.Contract,
  aliases: {
    [key: string]: string
  },
) => Bud.Contract
