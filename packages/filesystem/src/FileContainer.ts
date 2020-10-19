import path from 'path'

import * as fs from 'fs-extra'
import {Indexed as Container} from '@roots/container'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import watcher from './watcher'
import __ from 'lodash'

export {FileContainer}

class FileContainer extends Container {
  public fs = fs

  public repository: Container.Repository

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

  public setBase = function (dir: string): void {
    this.base = dir
  }

  public getBase = function (): string {
    return this.base
  }

  public setDisk(glob: string[]): void {
    const files = this.glob.sync(glob, {
      onlyFiles: false,
      expandDirectories: true,
    })

    this.repository = files.reduce(
      (acc: Container.Repository, curr: Container.Item) => ({
        ...acc,
        [curr.replace(`${this.base}/`, '')]: curr,
      }),
      {},
    )
  }

  public ls(key?: string): Container.Item {
    return key ? __.get(this.repository, key) : this.repository
  }

  public get: Container.Get = function (key) {
    return __.get(this.repository, key)
  }

  public exists = function (key: string): boolean {
    return this.fs.existsSync(this.get(key))
  }

  public read = function (key: string): string {
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

  public require(key: string): NodeModule {
    return require(this.get(key))
  }
}
