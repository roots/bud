import {Disk as Base} from '@roots/bud-framework'
import {FileContainer} from '@roots/filesystem'
import {boundMethod as bind} from 'autobind-decorator'

export class Disk extends Base {
  @bind
  public register(): void {
    this.setStore({
      ['@roots']: {
        baseDir: this.app.path('modules', '@roots'),
        glob: this.pattern,
      },
      project: {
        baseDir: this.app.path('project'),
        glob: this.pattern,
      },
    })

    this.every((name, disk) => {
      this.set(name, this.make(name, disk))
    })
  }

  @bind
  public boot(): void {
    this.get('project').has('package.json')
      ? this.app.store.set(
          'project',
          this.get('project').readJson('package.json'),
        )
      : this.app.log(
          'No package.json found: %s',
          this.get('project'),
        )
  }

  @bind
  public make(
    key: string | number,
    options: {baseDir?: string; glob?: string[]} = {
      baseDir: this.baseDir,
      glob: this.pattern,
    },
  ): FileContainer {
    this.set(key, this.makeFileContainer(options))

    return this.get(key)
  }

  @bind
  protected makeFileContainer(options: {
    baseDir?: string
    glob?: string[]
  }): FileContainer {
    const dir = options?.baseDir ?? this.baseDir
    const glob = options?.glob ?? this.pattern

    this.app.log(`Making disk: %s`, dir)

    const container = new FileContainer(dir)
    container.setDisk(glob)

    return container
  }
}
