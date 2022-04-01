import {globby} from '@roots/bud-support'

import {Framework} from '../..'
import {path} from './path'

/**
 * @public
 */
export async function doGlob(search: string): Promise<Array<string>> {
  try {
    this.log(`search`, search)
    const results = await globby.globby(search, {cwd: this.path('@src')})

    this.log(`results`, results)

    if (!results.length) {
      this.error(
        `bud.entry found no files matching ${JSON.stringify(
          search,
        )}. check your config for errors. files should be specified relative to ${this.path(
          '@src',
        )}. fast glob syntax can be referenced here https://git.io/JkGbw`,
      )

      throw new Error(
        `nothing resolvable for ${JSON.stringify(
          search,
        )} query of results for ${this.path('@src')}`,
      )
    }

    return results
  } catch (error) {
    throw new Error(error)
  }
}

export type glob = path<Promise<Array<string>>>

export const glob: glob = async function (base, ...segments) {
  const app = this as Framework
  const path = app.path(base, ...segments)

  return await doGlob(path)
}
