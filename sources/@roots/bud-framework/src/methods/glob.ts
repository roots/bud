import type {Bud} from '@roots/bud-framework'

import globby, {globbySync} from '@roots/bud-support/globby'
import logger from '@roots/bud-support/logger'

export interface globSync {
  (...searches: Array<Array<string> | string>): Array<string>
}

export interface glob {
  (...searches: Array<Array<string> | string>): Promise<Array<string>>
}

/**
 * Process a bud.path as a glob. Sync version.
 *
 * @remarks
 * Uses fast-glob syntax
 */
export const globSync: globSync = function (...searches) {
  try {
    const paths = searches.flatMap(search => transformPaths(this, search))
    logger.info(`glob (sync)`, `[paths]`, paths)

    const results = globbySync(paths)
    logger.info(`glob (sync)`, `[results]`, results)

    return results
  } catch (error) {
    this.catch(error)
    throw error // this should never happen
  }
}

/**
 * Process a bud.path as a glob.
 *
 * @remarks
 * Uses fast-glob syntax
 */
export const glob: glob = async function (...searches) {
  try {
    const paths = searches.flatMap(search => transformPaths(this, search))
    logger.info(`glob (async)`, ...paths)

    const results = await globby(paths)
    logger.success(`glob (sync)`, ...results)

    return results
  } catch (error) {
    this.catch(error)
    throw error // this should never happen
  }
}

const transformPaths = (app: Bud, search: Array<string> | string) =>
  Array.isArray(search)
    ? search.map(item => app.path(item))
    : app.path(search)
