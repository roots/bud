/// <reference types="node" />
import path from 'path'
import filesystem from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import {ContainerInterface} from '@roots/container'
import watcher from './watcher'
import FileContainer from './FileContainer'
import Filesystem from './Filesystem'
/**
 * A container acting as a virtual disk for simpler filesystem IO.
 */
export interface FileContainerInterface
  extends ContainerInterface {
  /**
   * Basepath of disk.
   */
  base: string
  /**
   * FS-Extra instance.
   */
  fs: typeof filesystem
  /**
   * Globby instance.
   */
  glob: typeof globby
  /**
   * PlatformPath utilities.
   */
  path: typeof path
  /**
   * ResolveFrom utility.
   */
  from: typeof resolveFrom
  /**
   * Watchman instance.
   */
  watcher: typeof watcher
  /**
   * Get a filepath
   */
  get: ContainerInterface['get']
  /**
   * Set the base filepath
   */
  setBase: (dir: string) => void
  /**
   * Check if a file exists in the repository.
   */
  exists: (key: string) => boolean
  /**
   * Relative to the set basepath, glob for files and set to the repository.
   */
  setDisk: (glob: string[]) => void
  /**
   * Read a repository item file contents as a utf8 string.
   */
  read: (key: string) => string
  /**
   * Read JSON from a repository item's file.
   */
  readJson: (key: string) => unknown
  /**
   * Write a string to a repository item's file.
   */
  write: (key: string, content: string) => void
  /**
   * Write JSON to a repository item's file.
   */
  writeJson: (key: string, content: string) => void
  /**
   * Require a modular item
   */
  require(this: ContainerInterface, key: string): NodeModule
}
export {FileContainer as default, Filesystem}
//# sourceMappingURL=index.d.ts.map
