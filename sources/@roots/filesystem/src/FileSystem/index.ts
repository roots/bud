import {Container} from '@roots/container'
import {boundMethod as bind} from 'autobind-decorator'
import {get} from 'lodash'
import * as path from 'path'

import {FileContainer} from '..'

/**
 * FileSystem class
 *
 * @public
 */
export class FileSystem extends Container<FileContainer> {
  /**
   * @internal
   */
  private _path: path.PlatformPath = path

  /**
   * Accessor: path
   *
   * @public
   */
  public get path(): path.PlatformPath {
    return this._path
  }

  /**
   * Base directory
   */
  private _baseDir: string = process.cwd()
  public get baseDir(): string {
    return this._baseDir
  }
  public set baseDir(dir: string) {
    this._baseDir = dir
  }

  /**
   * Get
   *
   * Call without a key to get all disks.
   * Pass a key to get a specific disk.
   */
  @bind
  public get<T = FileContainer>(key?: string): T {
    return get(this.repository, key) as unknown as T
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
   *   bud.path('assets/icons'),
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
      new FileContainer(baseDir).setDisk(options?.glob ?? ['*', '**/*']),
    )

    return this.get(key)
  }
}
