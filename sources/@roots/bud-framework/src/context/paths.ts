import {createHash} from 'node:crypto'
import {join} from 'node:path'

import {BudError} from '@roots/bud-support/errors'
import args from '@roots/bud-framework/context/args'
import * as envBootstrap from '@roots/bud-framework/context/env'
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

const get = (directory?: string): paths => {
  if (paths) return paths

  if (!directory)
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

  let basedir: string = directory
  let sha1 = createHash(`sha1`).update(directory)
  let hash: string
  let env = envBootstrap.get(directory)

  const specified = args.basedir ?? env.APP_BASE_PATH
  if (specified && !directory.endsWith(specified)) {
    basedir = join(directory, specified)
    sha1.update(basedir)
    env = envBootstrap.get(basedir)
  }

  hash = sha1.digest(`base64url`)
  let storage: string = join(systemPaths.cache, hash)

  if (args.storage || args[`@storage`] || env.APP_STORAGE_PATH) {
    storage = join(
      basedir,
      args.storage ?? args[`@storage`] ?? env.APP_STORAGE_PATH,
    )
  }

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
