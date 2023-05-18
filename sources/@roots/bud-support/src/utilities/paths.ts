import {createHash} from 'node:crypto'
import {join, normalize} from 'node:path'

import envPaths from 'env-paths'

import {BudError} from '../errors/errors.js'
import args from './args.js'
import * as envBootstrap from './env.js'

const systemPaths = envPaths(`bud`)

let env: ReturnType<typeof envBootstrap.get>

interface paths {
  /**
   * Hash of paths
   */
  hash: string

  /**
   * Base directory for all paths
   */
  basedir: string

  /**
   * Directory for temporary files
   * @default os-cache
   */
  storage: string

  /**
   * OS reported directory for cache files
   */
  [`os-data`]: string

  /**
   * OS reported directory for configuration files
   */
  [`os-config`]: string

  /**
   * OS reported directory for cache files
   */
  [`os-cache`]: string

  /**
   * OS reported directory for log files
   */
  [`os-log`]: string

  /**
   * OS reported directory for temporary files
   */
  [`os-temp`]: string
}

/**
 * Cache paths
 */
let paths: paths

const get = (directory?: string): paths => {
  if (paths) return paths

  if (!directory)
    throw new BudError(
      `paths: directory is required if paths not already initialized`,
      {
        props: {
          details: `\
This error is thrown when the paths utility is called without a directory argument and the paths have not already been initialized.
This is most likely a problem with the internals of bud.js.`,
          issue: new URL(
            `https://github.com/roots/bud/search?q=paths+error+is:issue`,
          ),
        },
      },
    )

  env = envBootstrap.get(directory)

  const basearg = args?.cwd ?? args?.basedir ?? env.APP_BASE_PATH
  const basedir = basearg ? join(directory, basearg) : directory
  const hash = createHash(`sha1`).update(basedir).digest(`base64`)

  const storagearg =
    args?.storage ?? args?.[`@storage`] ?? env.APP_STORAGE_PATH

  const storage = storagearg
    ? normalize(join(directory, storagearg))
    : join(systemPaths.cache, hash)

  paths = {
    ...Object.entries(systemPaths).reduce(
      (acc, [key, value]) => {
        return {...acc, [`os-${key}`]: join(value, hash)}
      },
      {basedir, storage, hash} as paths,
    ),
  }

  return paths
}

export {get, paths}
