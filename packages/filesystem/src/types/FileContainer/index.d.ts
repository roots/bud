import path from 'path'
import * as fs from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import __ from 'lodash'

export {FileContainer}

declare class FileContainer {
  /**
   * FS Extra utilities.
   */
  fs: typeof fs

  /**
   * FileContainer contents.
   */
  repository: {[key: string]: string}

  /**
   * Globby.
   */
  glob: typeof globby

  /**
   * NodePath
   */
  path: typeof path

  /**
   * Resolution utility when things get dicey.
   * @see {resolve-from}
   */
  from: typeof resolveFrom

  /**
   * Base directory (doesn't actually exist but we need to pretend like it does so Typescript doesn't get upset.)
   */
  base: string

  /**
   * Set the base directory.
   */
  setBase: (dir: string) => void

  /**
   * Get the base directory
   */
  getBase: () => string

  /**
   * Set tracked files.
   */
  setDisk: (glob: string[]) => void

  /**
   * List files.
   */
  ls: (key?: string) => any

  /**
   * Get a file path by key.
   */
  get: (key?: string) => any

  has: (key: string) => boolean

  ensure: (this: FileContainer, key: string) => void

  ensureDir: (this: FileContainer, key: string) => void

  /**
   * Check if file exists in disk.
   */
  exists: (key: string) => boolean

  /**
   * Get file contents as a string.
   */
  read: (key: string) => string

  /**
   * Get an object from a JSON file
   */
  readJson: (key: string) => unknown

  /**
   * Write a string to a file.
   */
  write: (key: string, content: string) => void

  /**
   * Write an object to a file.
   */
  writeJson: (key: string, content: string) => void

  /**
   * Require a file.
   */
  require: (key: string) => NodeModule
}
