import {createHash} from 'node:crypto'
import {isAbsolute, join} from 'node:path'

import {BudError} from '@roots/bud-support/errors'
import logger from '@roots/bud-support/logger'
import args from '@roots/bud-support/utilities/args'
import * as envBootstrap from '@roots/bud-support/utilities/env'
import envPaths from 'env-paths'

interface paths {
  /**
   * OS reported directory for cache files
   */
  [`os-cache`]: string

  /**
   * OS reported directory for configuration files
   */
  [`os-config`]: string

  /**
   * OS reported directory for cache files
   */
  [`os-data`]: string

  /**
   * OS reported directory for log files
   */
  [`os-log`]: string

  /**
   * OS reported directory for temporary files
   */
  [`os-temp`]: string

  /**
   * Base directory for all paths
   */
  basedir: string

  /**
   * Basedir hash
   */
  hash: string
  /**
   * Directory for temporary files
   * @default os-cache
   */
  storage: string
}

const systemPaths = envPaths(`bud`)

/**
 * Cache paths
 */
let paths: paths

const get = (basedir?: string): paths => {
  if (paths) return paths

  if (!basedir)
    throw new BudError(
      `directory is required if paths not already initialized`,
      {
        details: `\
This error is thrown when the paths utility is called without a directory argument and the paths have not already been initialized.
This is most likely a problem with the internals of bud.js.`,
        issue: new URL(
          `https://github.com/roots/bud/search?q=paths+error+is:issue`,
        ),
      },
    )

  let sha1 = createHash(`sha1`).update(basedir)
  let hash: string
  let env = envBootstrap.get(basedir)

  const specified = args.basedir ?? env.BUD_PATH_BASE ?? env.APP_BASE_PATH

  if (specified && !basedir.endsWith(specified)) {
    logger.scope(`paths`).log(`using specified basedir:`, specified)

    basedir = join(basedir, specified)

    sha1.update(basedir)
    env.basedir = basedir

    logger.scope(`paths`).success(`set basedir to`, basedir)
  }

  hash = sha1.digest(`base64url`)
  let storage: string =
    args.storage ??
    args[`@storage`] ??
    env.BUD_PATH_STORAGE ??
    env.APP_STORAGE_PATH ??
    join(systemPaths.cache, hash)

  storage = isAbsolute(storage) ? storage : join(basedir, storage)

  paths = {
    ...Object.entries(systemPaths).reduce(
      (acc, [key, value]) => {
        return {...acc, [`os-${key}`]: join(value, hash)}
      },
      {basedir, hash, storage} as paths,
    ),
  }

  return paths
}

export {get, paths}
