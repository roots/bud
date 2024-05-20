import type * as FS from '@roots/filesystem/filesystem'

import {argv} from 'node:process'
import {isMainThread} from 'node:worker_threads'

import {BudError} from '@roots/bud-support/errors'
import Filesystem from '@roots/filesystem/filesystem'
import * as json from '@roots/filesystem/json'
import * as yml from '@roots/filesystem/yml'

let currentDirectory: string
let filesystem: Filesystem = new Filesystem(process.cwd())

export const get = (basedir: string) => {
  if (typeof basedir !== `string`)
    throw BudError.normalize(
      `filesystem not initialized. basedir arg required for initialization.`,
      {thrownBy: import.meta.url},
    )

  if (filesystem && currentDirectory === basedir) return filesystem
  currentDirectory = basedir
  filesystem = new Filesystem(basedir)

  /**
   * change directory to basedir for process.cwd() to work as expected
   *
   * @remarks
   * - no need to do this if the basedir is the same as the cwd
   * - workers don't support process.chdir
   */
  const modifiedBaseDirectory =
    argv.includes(`--basedir`) || argv.includes(`--cwd`)

  if (isMainThread && modifiedBaseDirectory) process.chdir(basedir)

  return filesystem
}

export default filesystem
export {filesystem, filesystem as fs, Filesystem, json, yml}
export type {FS}
