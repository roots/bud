import path, {PlatformPath} from 'path'
import * as fs from 'fs-extra'
import globby from 'globby'
import resolveFrom from 'resolve-from'
import _ from 'lodash'
import {Container} from '@roots/container'

/**
 * FileContainer
 *
 * FS abstraction library conceptually similar to
 * FlySystem for PHP (but much more basic).
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/filesystem](#)
 * [📦 @roots/filesystem](https://www.npmjs.com/package/@roots/filesystem)
 * [🔗 Documentation](#)
 */
export class FileContainer extends Container {
  /**
   * FS-Extra library
   */
  public fs: typeof fs = fs

  /**
   * Globby library.
   */
  public glob: typeof globby = globby

  /**
   * PlatformPath
   */
  public path: PlatformPath = path

  /**
   * resolveFrom (better resolve)
   */
  public from: typeof resolveFrom = resolveFrom

  /**
   * Base directory
   */
  public _baseDir: string = process.cwd()

  /**
   * Class constructor.
   */
  constructor(baseDir?: string) {
    super()

    this._baseDir = baseDir
    this.setDisk = this.setDisk.bind(this)
  }

  /**
   * ## setBase
   *
   * Set the FS base directory.
   *
   * ### Usage
   *
   * ```
   * fsInstance.setBase(__dirname)
   * ```
   */
  public set baseDir(dir: string) {
    this._baseDir = dir
  }

  /**
   * ## getBase
   *
   * Returns the FS base directory.
   *
   * ### Usage
   *
   * ```
   * fsInstance.getBase()
   * ```
   */
  public get baseDir(): string {
    return this._baseDir
  }

  /**
   * ## setDisk
   *
   * Establish the disk repository from an array of globs.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.setDisk(['*.js', '!*.css.js'])
   * ```
   */
  public setDisk = function (glob: string[]): void {
    this.glob
      .sync(glob ?? ['*', '**/*', '!vendor', '!node_modules'], {
        onlyFiles: false,
        cwd: this._baseDir,
        expandDirectories: true,
      })
      .map((file: any) => {
        this.set(file, path.join(this.baseDir, file))
      })

    return this
  }

  /**
   * ## fs.ls
   *
   * List repository contents.
   *
   * ### Usage
   *
   */
  public ls = function (key?: string): any {
    return key ? _.get(this.repository, key) : this.repository
  }

  /**
   * ## has
   *
   * Return boolean `true` if key is a match.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.has('some/file.js')
   * ```
   */
  public has = function (key: string): boolean {
    return _.has(this.repository, key)
  }

  /**
   * ## set
   *
   * Set a value.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.set('some/file.js', '/absolute/path/to/some/file.js')
   * ```
   */
  public set(key: string, value: any): this {
    _.set(this.repository, [`${key}`], value)

    return this
  }

  /**
   * ## exists
   *
   * Return a boolean `true` if repository has a key and it's value
   * resolves to an actual disk location.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.exists('some/file.js')
   * ```
   */
  public exists = function (key: string): boolean {
    return this.fs.existsSync(this.get(key))
  }

  /**
   * ## ensure
   *
   * Create a file if it does not already exist. Will also create an
   * associated repository entry if it doesn't exist.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.ensure('some/file.js')
   * ```
   */
  public ensure = function (key: string): void {
    const file = this.has(key)
      ? this.get(key)
      : this.path.resolve(this.baseDir, key)

    this.fs.ensureFileSync(file)
    this.set(key, file)
  }

  /**
   * ## ensureDir
   *
   * Create a directory if it does not already exist. Will also create an
   * associated repository entry if it doesn't exist.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.ensureDir('some/file.js')
   * ```
   */
  public ensureDir = function (key: string): void {
    const dir = this.has(key)
      ? this.get(key)
      : this.path.resolve(this.baseDir, key)

    this.fs.ensureDirSync(dir)

    this.set(key, dir)
  }

  /**
   * ## read
   *
   * Read file contents as a utf8 encoded string.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.read('some/file.md')
   * ```
   */
  public read = function (key: string): string {
    return this.fs.readFileSync(this.get(key), 'utf8')
  }

  /**
   * ## readJson
   *
   * Retrieve file contents as a javascript object.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.readJson('some/file.json')
   * // => {json: 'contents', as: 'an object'}
   * ```
   */
  public readJson = function (
    key: string,
  ): {[key: string]: any} {
    return this.fs.readJsonSync(this.get(key))
  }

  /**
   * ## write
   *
   * Write file contents as a string
   *
   * ### Usage
   *
   * ```js
   * fsInstance.write('some/file.md', 'string contens')
   * ```
   */
  public write = function (key: string, content: string): void {
    const file = this.has(key)
      ? this.get(key)
      : this.path.resolve(this.baseDir, key)

    this.fs.writeFileSync(file, content)

    this.set(key, file)
  }

  /**
   * ## writeJson
   *
   * Write file contents as a JSON object.
   *
   * ### Usage
   *
   * ```js
   * fsInstance.writeJson(
   *   'some/file.json',
   *   {json: 'file contents'},
   * )
   * ```
   */
  public writeJson = function (
    key: string,
    content: string,
  ): void {
    const file = this.has(key)
      ? this.get(key)
      : this.path.resolve(this.baseDir, key)

    this.fs.writeJsonSync(file, content)
    this.set(key, file)
  }

  /**
   * ## require
   *
   * NodeRequire a matching file as a module
   *
   * ### Usage
   *
   * ```js
   * fsInstance.require('path/to/module.js')
   * ```
   */
  public require = function (key: string): NodeModule {
    return require(this.get(key))
  }
}
