import _ from 'lodash'
import {resolve} from 'path'
import {Indexed as Container} from '@roots/container'
import {FileContainer} from './FileContainer'

export class FileSystem extends Container {
  public current: FileContainer

  public repository: Container.Repository

  constructor() {
    super()
  }

  public get: Container.Get = function (key) {
    this.current = _.get(this.repository, key)
    return this.current
  }

  public ls(key?: string): Container.Item {
    return key ? _.get(this.repository, key) : this.repository
  }

  public get baseDir(): string {
    return this.current.getBase()
  }

  public set: Container.Using = function (
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
