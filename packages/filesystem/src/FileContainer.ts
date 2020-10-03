import Container from '@roots/container'
import path from 'path'
import * as fs from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import __ from 'lodash'
import watcher from './watcher'

export default class extends Container {
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

  public get(key: string): Container.Item {
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

declare class FileContainer extends Container {
  /**
   * Basepath of disk.
   */
  base: string

  /**
   * FS-Extra instance.
   */
  fs: typeof fs

  /**
   * Globby instance.
   */
  glob: typeof globby

  /**
   * PlatformPath utilities.
   */
  path: typeof path

  /**
   * ResolveFrom utility.
   */
  from: typeof resolveFrom

  /**
   * Watchman instance.
   */
  watcher: typeof watcher

  /**
   * Set the base filepath
   */
  setBase: (dir: string) => void

  /**
   * Check if a file exists in the repository.
   */
  exists: (key: string) => boolean

  /**
   * Relative to the set basepath, glob for files and set to the repository.
   */
  setDisk(glob: string[]): void

  /**
   * Read a repository item file contents as a utf8 string.
   */
  read(key: string): string

  /**
   * Read JSON from a repository item's file.
   */
  readJson(key: string): unknown

  /**
   * Write a string to a repository item's file.
   */
  write(key: string, content: string): void

  /**
   * Write JSON to a repository item's file.
   */
  writeJson(key: string, content: string): void

  /**
   * Require a modular item
   */
  require(this: Container.Interface, key: string): NodeModule
}
