import Service from '../Service'
import {fs, globby, lodash as _} from '@roots/bud-support'
import path from 'path'
import {FileContainer} from '@roots/filesystem'

/**
 * Disk
 */
export default class extends Service {
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
   * Service register
   */
  public register(): void {
    this.register = this.register.bind(this)
    this.make = this.make.bind(this)

    this.every((name, disk) => {
      this.make(name, {
        baseDir: disk.baseDir ?? process.cwd(),
        glob: disk.glob ?? ['*'],
      })
    })
  }

  /**
   * Service boot
   */
  public boot(): void {
    //
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

  public get(key: string) {
    return this.repository[key]
  }

  public get baseDir(): string {
    return this._baseDir
  }

  public set baseDir(baseDir: string) {
    this._baseDir = baseDir
  }
}
