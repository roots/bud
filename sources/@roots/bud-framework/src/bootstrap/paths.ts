import {createHash} from 'node:crypto'
import {isAbsolute, join} from 'node:path'

import args from '@roots/bud-framework/bootstrap/args'
import * as envBootstrap from '@roots/bud-framework/bootstrap/env'
import envPaths from '@roots/bud-support/env-paths'
import logger from '@roots/bud-support/logger'

interface paths {
  /**
   * Basedir
   */
  basedir: string

  /**
   * Basedir hash
   */
  hash: string

  /**
   * Input directory
   * @default src
   */
  input: string

  /**
   * Modules directory
   * @default node_modules
   */
  modules: string

  /**
   * Output directory
   * @default dist
   */
  output: string

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
const paths: paths = {
  basedir: process.cwd(),
  hash: ``,
  input: `src`,
  modules: `node_modules`,
  output: `dist`,
  storage: ``,
}

const get = (basedir: string): paths => {
  paths.basedir = basedir ?? process.cwd()

  const sha1 = createHash(`sha1`).update(basedir)
  const env = envBootstrap.get(basedir)

  const specifiedBasePath =
    args.basedir ?? env.BUD_PATH_BASE ?? env.APP_BASE_PATH

  if (specifiedBasePath && !paths.basedir.endsWith(specifiedBasePath)) {
    paths.basedir = isAbsolute(specifiedBasePath)
      ? specifiedBasePath
      : join(basedir, specifiedBasePath)

    env.basedir = paths.basedir

    sha1.update(paths.basedir)
    logger.scope(`paths`).log(`Set basedir to`, paths.basedir)
  }
  paths.hash = sha1.digest(`base64url`)

  const storage: string =
    args.paths?.storage ??
    env.BUD_PATH_STORAGE ??
    env.APP_STORAGE_PATH ??
    join(systemPaths.cache, paths.hash)

  paths.storage = isAbsolute(storage)
    ? storage
    : join(paths.basedir, storage)

  return paths
}

export {get, paths}
