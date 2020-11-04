import _ from 'lodash'
import {resolve} from 'path'
import {Container, Indexed} from '@roots/container'
import {FileContainer} from '..'

export class FileSystem extends Indexed {
  public current: FileContainer

  public repository: Indexed['repository']

  constructor() {
    super()

    Object.getOwnPropertyNames(this).map(name => {
      if (name !== 'repository') return
      Object.defineProperty(this, name, {
        enumerable: false,
      })
    })
  }

  public get: Container['get'] = function (key) {
    this.current = _.get(this.repository, key)
    return this.current
  }

  public ls = function (key?: string): any {
    return key ? _.get(this.repository, key) : this.repository
  }

  public get baseDir(): string {
    return this.current.getBase()
  }

  public set = function (
    key: string,
    options: {
      baseDir: string
      glob: string[]
    },
  ): FileContainer {
    const disk = new FileContainer(options.baseDir)

    const glob = options.glob.map(item =>
      resolve(options.baseDir, item),
    )

    glob.push(`!${resolve(options.baseDir, '**/types/**/*')}`)
    glob.push(`!${resolve(options.baseDir, '**/*.map')}`)
    glob.push(`!${resolve(options.baseDir, '**/*.d.ts')}`)
    glob.push(
      `!${resolve(options.baseDir, '**/node_modules/**/*')}`,
    )
    glob.push(`!${resolve(options.baseDir, '**/vendor/**/*')}`)

    disk.setDisk(glob)

    this.repository[key] = disk

    return (this.current = this.get(key))
  }
}
