import path from 'path'
import * as fs from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import watcher from '../watcher'
import _ from 'lodash'

export class FileContainer {
  public fs: typeof fs

  public repository: {[key: string]: string}

  public glob: typeof globby = globby

  public path: typeof path = path

  public from: typeof resolveFrom = resolveFrom

  public watcher: typeof watcher = watcher

  public base: string = process.cwd()

  constructor(baseDir?: string) {
    this.fs = fs

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

  public setDisk = function (glob: string[]): void {
    const files = this.glob.sync(glob, {
      onlyFiles: false,
      expandDirectories: true,
    })

    this.repository = files.reduce(
      (acc: FileContainer['repository'], curr: any) => ({
        ...acc,
        [curr.replace(`${this.base}/`, '')]: curr,
      }),
      {},
    )

    Object.getOwnPropertyNames(this)
      .filter(name => name !== 'repository')
      .map(name => {
        Object.defineProperty(this, name, {
          enumerable: false,
        })
      })
  }

  public ls = function (key?: string): any {
    return key ? _.get(this.repository, key) : this.repository
  }

  public get = function (key: string): any {
    return _.get(this.repository, key)
  }

  public has = function (key: string): boolean {
    return _.has(this.repository, key)
  }

  public set = function (key: string, value: any): any {
    return _.set(this.repository, key, value)
  }

  public exists = function (key: string): boolean {
    return this.fs.existsSync(this.get(key))
  }

  public ensure = function (
    this: FileContainer,
    key: string,
  ): void {
    const file = this.path.resolve(this.base, key)
    this.fs.ensureFileSync(file)

    this.set(key, file)
  }

  public ensureDir = function (
    this: FileContainer,
    key: string,
  ): void {
    const dir = this.path.resolve(this.base, key)
    this.fs.ensureDirSync(dir)

    this.set(key, dir)
  }

  public read = function (key: string): string {
    return this.fs.readFileSync(this.get(key), 'utf8')
  }

  public readJson = function (
    key: string,
  ): {[key: string]: any} {
    return this.fs.readJsonSync(this.get(key))
  }

  public write = function (key: string, content: string): void {
    const file = this.path.resolve(this.base, key)
    this.fs.writeFileSync(file, content)

    this.set(key, file)
  }

  public writeJson = function (
    key: string,
    content: string,
  ): void {
    const file = this.path.resolve(this.base, key)
    this.fs.writeJsonSync(file, content)
    this.set(key, file)
  }

  public require = function (key: string): NodeModule {
    return require(this.get(key))
  }
}
