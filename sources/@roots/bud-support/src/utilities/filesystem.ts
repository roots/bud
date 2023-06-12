import {isMainThread} from 'node:worker_threads'

import {BudError} from '../errors/errors.js'
import {Filesystem} from '../filesystem/index.js'
import {paths} from './paths.js'

let filesystem: Filesystem

export const get = (basedir?: string) => {
  if (filesystem) return filesystem

  if (typeof basedir !== `string`)
    throw new BudError(
      `filesystem not initialized. basedir arg required for initialization.`,
    )

  filesystem = new Filesystem(basedir)

  /**
   * change directory to basedir for process.cwd() to work as expected
   *
   * @remarks
   * - no need to do this if the basedir is the same as the cwd
   * - workers don't support process.chdir
   */
  const modifiedBaseDirectory = paths.basedir !== process.cwd()
  if (isMainThread && modifiedBaseDirectory) process.chdir(basedir)

  return filesystem
}

export {filesystem, Filesystem}
