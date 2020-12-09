import _ from 'lodash'
import {resolve} from 'path'
import {FileContainer} from '..'

export class FileSystem {
  public current: FileContainer

  public repository: {[key: string]: FileContainer}

  public constructor() {
    this.repository = {}
  }

  public get(key?: string): any {
    this.current = _.get(this.repository, key)

    return this.current
  }

  public has(key: string): boolean {
    return _.has(this.repository, key)
  }

  public ls(key?: string): any {
    return key ? _.get(this.repository, key) : this.repository
  }

  public set(
    key: string,
    options: {base: string; glob: string[]},
  ): this['current'] {
    const base = options.base

    const disk = new FileContainer(base)

    disk.setDisk([
      ...options.glob.map(item => resolve(base, item)),
      `!${resolve(base, '**/types/**/*')}`,
      `!${resolve(base, '**/*.map')}`,
      `!${resolve(base, '**/*.d.ts')}`,
      `!${resolve(base, '**/node_modules/**/*')}`,
      `!${resolve(base, '**/vendor/**/*')}`,
    ])

    _.set(this.repository, key, disk)

    this.current = this.get(key)

    return this.current
  }
}
