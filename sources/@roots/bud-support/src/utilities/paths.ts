import {join} from 'node:path'

import args from './args.js'
import * as projectEnv from './env.js'

const paths: Record<string, string> = {}

const get = (directory?: string): Record<string, string> => {
  if (paths.basedir) return paths

  if (!directory)
    throw new Error(
      `[bud] paths: directory is required if paths not already initialized`,
    )

  const env = projectEnv.get(directory)

  const basearg = args?.cwd ?? args?.basedir ?? env.APP_BASE_PATH
  paths.basedir = basearg ? join(directory, basearg) : directory

  paths.storage = join(
    paths.basedir,
    args?.storage ?? env.APP_STORAGE_PATH ?? `.budfiles`,
  )

  paths.src = join(
    paths.basedir,
    args.input ??
      args?.[`i`] ??
      args?.[`src`] ??
      args?.[`@src`] ??
      env.APP_SRC_PATH ??
      `src`,
  )

  return paths
}

export {get}
