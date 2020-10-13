import Container from '@roots/container'
import path from 'path'
import * as fs from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import watcher from './watcher'

declare class FileSystem extends Container {
  public current: FSContainer

  constructor()

  public get(key: string): FSContainer

  public set(
    key: string,
    options: {
      baseDir: string
      glob: string[]
    },
  ): FSContainer
}

declare class FSContainer extends Container {
  /**
   * Basepath of disk.
   */
  base: string

  /**
   * FS-Extra instance.
   */
  fs: typeof fs

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
   * Class constructor
   */
  constructor(baseDir?: string)

  /**
   * Set the base filepath
   */
  setBase(dir: string): void

  /**
   * Get the base filepath
   */
  getBase(): string

  /**
   * Check if a file exists in the repository.
   */
  exists(key: string): boolean

  /**
   * Relative to the set basepath, glob for files and set to the repository.
   */
  setDisk(glob: string[]): void

  /**
   * Read a repository item file contents as a utf8 string.
   */
  read(key: string): string

  /**
   * Read JSON from a repository item's file.
   */
  readJson(key: string): unknown

  /**
   * Write a string to a repository item's file.
   */
  write(key: string, content: string): void

  /**
   * Write JSON to a repository item's file.
   */
  writeJson(key: string, content: string): void

  /**
   * Require a modular item
   */
  require(this: Container.Interface, key: string): NodeModule
}
