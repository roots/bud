import Service from '../Service'
import {lodash as _} from '@roots/bud-support'
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
