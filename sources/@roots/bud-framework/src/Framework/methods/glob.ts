import {globby} from '@roots/bud-support'

import {Framework} from '../..'

export interface globSync {
  (...searches: Array<Array<string> | string>): Array<string>
}

export interface glob {
  (...searches: Array<Array<string> | string>): Promise<Array<string>>
}

export const globSync: globSync = function (...searches) {
  const app = this as Framework

  try {
    const paths = searches.flatMap(search => transformPaths(app, search))
    app.info(`glob (sync)`, `[paths]`, paths)

    const results = globby.globbySync(paths)
    app.info(`glob (sync)`, `[results]`, results)

    return results
  } catch (error) {
    throw new Error(error)
  }
}

export const glob: glob = async function (...searches) {
  const app = this as Framework

  try {
    const paths = searches.flatMap(search => transformPaths(app, search))
    app.info(`glob (async)`, `[paths]`, paths)

    const results = globby.globby(paths)
    app.info(`glob (sync)`, `[results]`, results)

    return results
  } catch (error) {
    throw new Error(error)
  }
}

const transformPaths = (app: Framework, search: Array<string> | string) =>
  Array.isArray(search)
    ? search.map(search => app.path(search))
    : app.path(search)
