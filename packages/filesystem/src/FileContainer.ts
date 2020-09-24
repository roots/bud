import path from 'path'
import filesystem from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import __ from 'lodash'

import Container, {
  ContainerInterface,
  Item,
  Loose,
} from '@roots/container'
import watcher from './watcher'

import {FileContainerInterface} from './'

class FileContainer
  extends Container
  implements FileContainerInterface {
  public fs: typeof filesystem = filesystem

  public glob: typeof globby = globby

  public path: typeof path = path
  public from: typeof resolveFrom = resolveFrom
  public watcher: typeof watcher = watcher
  public base: string = process.cwd()

  constructor(baseDir?: string) {
    super()

    this.setBase = this.setBase.bind(this)
    this.exists = this.exists.bind(this)
    this.setDisk = this.setDisk.bind(this)

    if (baseDir) {
      this.setBase(baseDir)
    }
  }

  public setBase: FileContainerInterface['setBase'] = function (
    dir: string,
  ): void {
    this.base = dir
  }

  public setDisk(
    this: ContainerInterface,
    glob: string[],
  ): void {
    const files = this.glob.sync(glob, {
      onlyFiles: false,
      expandDirectories: true,
    })

    this.repository = files.reduce(
      (acc: Loose, curr: Item) => ({
        ...acc,
        [curr.replace(`${this.base}/`, '')]: curr,
      }),
      {},
    )
  }

  public get(this: ContainerInterface, key: string): Item {
    return __.get(this.repository, key)
  }

  public exists: FileContainerInterface['exists'] = function (
    key: string,
  ): boolean {
    return this.fs.existsSync(this.get(key))
  }

  public read: FileContainerInterface['read'] = function (
    key: string,
  ): string {
    return this.fs.readFileSync(this.get(key), 'utf8')
  }

  public readJson(key: string): unknown {
    return this.fs.readJsonSync(this.get(key))
  }

  public write(key: string, content: string): void {
    this.fs.writeFileSync(
      this.path.resolve(this.base, key),
      content,
    )
  }

  public writeJson(key: string, content: string): void {
    this.fs.writeJsonSync(
      this.path.resolve(this.base, key),
      content,
    )
  }

  public require(
    this: ContainerInterface,
    key: string,
  ): NodeModule {
    return require(this.get(key))
  }
}

export {FileContainer as default}
