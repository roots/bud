import Service from '../Service'
import {fs, globby, lodash as _} from '@roots/bud-support'
import path from 'path'
import {FileContainer} from '@roots/filesystem'

/**
 * Disk
 */
export default class extends Service {
  /**
   * Service ident
   */
  public name = 'disk'

  /**
   * fs util
   *
   * @see fs-extra
   */
  public get fs(): typeof fs {
    return this.app.fs.util
  }

  /**
   * Globby library.
   */
  public get glob(): typeof globby {
    return this.app.fs.glob
  }

  /**
   * cwd
   */
  public get path(): typeof path {
    return this.app.fs.path
  }

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
        baseDir: disk.baseDir ?? this.baseDir,
        glob: disk.glob ?? [
          '**/*',
          '*',
          '!vendor',
          '!node_modules',
        ],
      })
    })
  }

  /**
   * Service boot
   */
  public boot(): void {
    this.app.store.set(
      'project',
      this.get('project').readJson('package.json'),
    )
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
   * disk.make(
   *   'icons',
   *   bud.project('assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  public make(
    key: string | number,
    options?: {baseDir?: string; glob?: string[]},
  ): FileContainer {
    this.info({msg: 'Making disk', key, options})

    this.set(
      key,
      new FileContainer(
        options?.baseDir ?? this.baseDir,
      ).setDisk(
        options?.glob ?? [
          '**/*',
          '*',
          '!vendor',
          '!node_modules',
        ],
      ),
    )

    return this.get(key)
  }

  /**
   * Get baseDir
   */
  public get baseDir(): string {
    return this._baseDir
  }

  /**
   * Set baseDir
   */
  public set baseDir(baseDir: string) {
    this._baseDir = baseDir
  }
}
