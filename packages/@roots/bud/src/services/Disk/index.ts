import {Service} from '@roots/bud-framework'
import {FileContainer} from '@roots/filesystem'

/**
 * Framework/Disk
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Disk extends Service {
  /**
   * Service name
   */
  public name = 'disk'

  /**
   * Base directory
   */
  protected _baseDir: string = process.cwd()

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

  /**
   * Service register
   */
  public register(): void {
    this.make = this.make.bind(this)

    this.setStore({
      ['@roots']: {
        baseDir: this.modulePath('@roots'),
        glob: ['**/*', '*', '!node_modules', '*.map'],
      },
      ['project']: {
        baseDir: this.app.subscribe('location/project'),
        glob: ['**/*', '*', '!node_modules', '!vendor'],
      },
    })

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
   * a custom glob array.
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
    options: {baseDir?: string; glob?: string[]} = {
      baseDir: this.baseDir,
      glob: ['**/*', '*', '!vendor', '!node_modules'],
    },
  ): FileContainer {
    this.logger
      .scope('@roots/bud-disk', key)
      .log(`Making disk from ${options.baseDir}`)

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
}
