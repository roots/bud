import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import {FileContainer} from '..'
import {Container} from '@roots/container'
import globby from 'globby'
import {boundMethod as bind} from 'autobind-decorator'

export class FileSystem extends Container<FileContainer> {
  /**
   * fs util
   *
   * @see fs-extra
   */
  public fs: typeof fs = fs

  /**
   * Globby library.
   */
  public glob: typeof globby = globby

  /**
   * cwd
   */
  public path: typeof path = path

  /**
   * Base directory
   */
  protected _baseDir: string = process.cwd()

  /**
   * Get
   *
   * Call without a key to get all disks.
   * Pass a key to get a specific disk.
   */
  @bind
  public get<T = FileContainer>(key?: string): T {
    return _.get(this.repository, key) as unknown as T
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
   *   bud.path('project', 'assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  @bind
  public make(
    key: string,
    options?: {baseDir?: string; glob?: string[]},
  ): FileContainer {
    const baseDir = options?.baseDir ?? this.baseDir

    this.set(
      key,
      new FileContainer(baseDir).setDisk(
        options?.glob ?? ['*', '**/*'],
      ),
    )

    return this.get(key)
  }

  public get baseDir(): string {
    return this._baseDir
  }

  public set baseDir(baseDir: string) {
    this._baseDir = baseDir
  }
}
