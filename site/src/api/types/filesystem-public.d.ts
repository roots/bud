/**
 * A simple, high-level virtual filesystem.
 *
 * @beta
 * This package is provided as-is.
 *
 * @packageDocumentation @betaDocumentation
 */

/// <reference types="node" />

import {Container} from '@roots/container'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as resolve from 'resolve-from'

export declare class FileContainer extends Container {
  /**
   * FS-Extra library
   */
  private _fs
  get fs(): typeof fs
  /**
   * PlatformPath
   */
  private _path
  get path(): path.PlatformPath
  /**
   * resolve
   */
  private _resolve
  get resolve(): typeof resolve
  /**
   * Base directory
   */
  private _baseDir
  get baseDir(): string
  set baseDir(dir: string)
  /**
   * Class constructor.
   */
  constructor(baseDir?: string)
  /**
   * Establish the disk repository from an array of globs.
   *
   * @example
   * ```js
   * fsInstance.setDisk(['*.js', '!*.css.js'])
   * ```
   */
  setDisk(glob: string[]): this
  /**
   * List repository contents.
   *
   * @example
   */
  ls(key?: string): any
  /**
   * Return boolean `true` if key is a match.
   *
   * @example
   * ```js
   * fsInstance.has('some/file.js')
   * ```
   */
  has(key: string): boolean
  /**
   * Set a value.
   *
   * @example
   * ```js
   * fsInstance.set('some/file.js', '/absolute/path/to/some/file.js')
   * ```
   */
  set(key: string, value: any): this
  /**
   * Return a boolean `true` if repository has a key and it's value
   * resolves to an actual disk location.
   *
   * @example
   * ```js
   * fsInstance.exists('some/file.js')
   * ```
   */
  exists(key: string): boolean
  /**
   * Create a file if it does not already exist. Will also create an
   * associated repository entry if it doesn't exist.
   *
   * @example
   * ```js
   * fsInstance.ensure('some/file.js')
   * ```
   */
  ensure(key: string): void
  /**
   * Create a directory if it does not already exist. Will also create an
   * associated repository entry if it doesn't exist.
   *
   * @example
   * ```js
   * fsInstance.ensureDir('some/file.js')
   * ```
   */
  ensureDir(key: string): void
  /**
   * Read file contents as a utf8 encoded string.
   *
   * @example
   * ```js
   * fsInstance.read('some/file.md')
   * ```
   */
  read(key: string): string
  /**
   * Retrieve file contents as a javascript object.
   *
   * @example
   * ```js
   * fsInstance.readJson('some/file.json')
   * // => {json: 'contents', as: 'an object'}
   * ```
   */
  readJson(key: string): {
    [key: string]: any
  }
  /**
   * Write file contents as a string
   *
   * @example
   * ```js
   * fsInstance.write('some/file.md', 'string contens')
   * ```
   */
  write(key: string, content: string): void
  /**
   * Write file contents as a JSON object.
   *
   * @example
   * ```js
   * fsInstance.writeJson(
   *   'some/file.json',
   *   {json: 'file contents'},
   * )
   * ```
   */
  writeJson(key: string, content: string): void
  /**
   * NodeRequire a matching file as a module
   *
   * @example
   * ```js
   * fsInstance.require('path/to/module.js')
   * ```
   */
  require(key: string): NodeModule
}

/**
 * FileSystem class
 *
 * @public
 */
declare class FileSystem_2 extends Container<FileContainer> {
  /* Excluded from this release type: _path */
  /**
   * Accessor: path
   *
   * @public
   */
  get path(): path.PlatformPath
  /**
   * Base directory
   */
  private _baseDir
  get baseDir(): string
  set baseDir(dir: string)
  /**
   * Get
   *
   * Call without a key to get all disks.
   * Pass a key to get a specific disk.
   */
  get<T = FileContainer>(key?: string): T
  /**
   * Make
   *
   * Create a new disk. Provide a name, root directory, and -- optionally --
   * a custom glob array. [🔗 Documentation on bud.disk](#)
   *
   * ### Usage
   *
   * ```js
   * fs.set(
   *   'icons',
   *   bud.path('project', 'assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  make(
    key: string,
    options?: {
      baseDir?: string
      glob?: string[]
    },
  ): FileContainer
}
export {FileSystem_2 as FileSystem}

export {}
