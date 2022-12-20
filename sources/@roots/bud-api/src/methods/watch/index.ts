import type {Bud} from '@roots/bud-framework'

export type Parameters = [string | Array<string>]

export interface watch {
  (
    /**
     * Watched files
     */
    ...files: Parameters
  ): Promise<Bud>
}

export const watch: watch = async function (this: Bud, input) {
  if (!this.isDevelopment) return this

  this.hooks.on(`dev.watch.files`, files => {
    const watchlist = files === undefined ? new Set<string>() : files

    ;(Array.isArray(input) ? input : [input]).map(file => {
      watchlist.add(file)
    })

    return watchlist
  })

  return this
}
