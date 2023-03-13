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

  const paths = searches.flatMap(search => transformPaths(app, search))
  return globbySync(paths)
}

/**
 * Process a bud.path as a glob.
 *
 * @remarks
 * Uses fast-glob syntax
 */
export const glob: glob = async function (...searches) {
  const app = this as Bud

  const paths = searches.flatMap(search => transformPaths(app, search))
  return await globby(paths)
}

const transformPaths = (app: Bud, search: Array<string> | string) =>
  Array.isArray(search)
    ? search.map(item => app.path(item))
    : app.path(search)
