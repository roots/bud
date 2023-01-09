import globby, {globbySync} from '@roots/bud-support/globby'

import type {Bud} from '../../bud.js'

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
  const app = this as Bud

  try {
    const paths = searches.flatMap(search => transformPaths(app, search))
    app.info(`glob (sync)`, `[paths]`, paths)

    const results = globbySync(paths)
    app.info(`glob (sync)`, `[results]`, results)

    return results
  } catch (error) {
    app.error(error)
  }
}

/**
 * Process a bud.path as a glob.
 *
 * @remarks
 * Uses fast-glob syntax
 */
export const glob: glob = async function (...searches) {
  const app = this as Bud

  try {
    const paths = searches.flatMap(search => transformPaths(app, search))
    app.info(`glob (async)`, ...paths)

    const results = await globby(paths)
    app.success(`glob (sync)`, ...results)

    return results
  } catch (error) {
    app.error(error)
  }
}

const transformPaths = (app: Bud, search: Array<string> | string) =>
  Array.isArray(search)
    ? search.map(item => app.path(item))
    : app.path(search)
