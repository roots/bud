import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import {FileContainer} from '..'
import {Container} from '@roots/container'

export class FileSystem extends Container<FileContainer> {
  /**
   * fs util
   *
   * @see fs-extra
   */
  public fs: typeof fs = fs

  /**
   * cwd
   */
  public path: typeof path = path

  /**
   * Current disk
   */
  public current: FileContainer

  /**
   * Base directory
   */
  protected _baseDir: string = process.cwd()

  public get baseDir(): string {
    return this._baseDir
  }

  public set baseDir(baseDir: string) {
    this._baseDir = baseDir
  }

  /**
   * Get
   *
   * Call without a key to get all disks.
   * Pass a key to get a specific disk.
   */
  public get(key?: string): FileContainer {
    return key ? _.get(this.repository, key) : this.current
  }

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
   *   bud.project('assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  public make(
    key: string,
    options?: {baseDir?: string; glob?: string[]},
  ): this['current'] {
    const baseDir = options?.baseDir ?? this.baseDir

    this.set(
      key, // with this key
      new FileContainer(baseDir).setDisk([
        ...(options?.glob ?? ['*', '**/*']).map(globStr =>
          this.path.resolve(baseDir, globStr),
        ), // disk base (default to cwd)
      ]),
    )

    this.current = this.get(key)

    return this.current
  }
}
