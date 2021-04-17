import {Service} from '@roots/bud-framework'
import {FileContainer} from '@roots/filesystem'
import {boundMethod as bind} from 'autobind-decorator'

declare interface Definition {
  [key: string]: {
    baseDir: string
    glob: string[]
  }
}

/**
 * Framework/Disk
 *
 * [🏡 Project home](https://roots.io/bud)
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

  public get baseDir(): string {
    return this._baseDir
  }

  public set baseDir(baseDir: string) {
    this._baseDir = baseDir
  }

  /**
   * Fallback pattern
   */
  protected _pattern: string[] = [
    '**/*',
    '*',
    '!vendor',
    '!node_modules',
  ]

  public get pattern(): string[] {
    return this._pattern
  }

  public set pattern(glob: string[]) {
    this._pattern = glob
  }

  /**
   * Service register
   */
  @bind
  public register(): void {
    this.setStore({
      ['@roots']: {
        baseDir: this.modulePath('@roots'),
        glob: this.pattern,
      },
      ['project']: {
        baseDir: this.subscribe('location/project'),
        glob: this.pattern,
      },
    })

    this.every((name, disk) => {
      this.set(name, this.make(name, disk))
    })
  }

  /**
   * Service boot
   */
  @bind
  public boot(): void {
    this.get('project').has('package.json')
      ? this.app.store.set(
          'project',
          this.get('project').readJson('package.json'),
        )
      : this.logger
          .scope("@roots/bud-disk couldn't find a package.json")
          .log(this.get('project'))
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
   *   bud.path('project', 'assets/icons'),
   *   ['*.svg'],
   * )
   * ```
   */
  @bind
  public make(
    key: string | number,
    options: {baseDir?: string; glob?: string[]} = {
      baseDir: this.baseDir,
      glob: this.pattern,
    },
  ): FileContainer {
    const container = this.makeFileContainer(options)

    this.logger
      .scope('@roots/bud-disk', key)
      .log(`Setting disk: ${container.baseDir}`)

    this.set(key, container)

    return this.get(key)
  }

  /**
   * Make file container
   */
  @bind
  public makeFileContainer(options: {
    baseDir?: string
    glob?: string[]
  }): FileContainer {
    const dir = options?.baseDir ?? this.baseDir
    const glob = options?.glob ?? this.pattern

    this.logger
      .scope('@roots/bud-disk')
      .log(`Making disk: ${dir}`)

    const container = new FileContainer(dir)
    container.setDisk(glob)

    return container
  }
}
