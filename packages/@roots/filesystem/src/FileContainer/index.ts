import path, {PlatformPath} from 'path'
import * as fs from 'fs-extra'
import resolveFrom from 'resolve-from'
import _ from 'lodash'
import {sync} from 'globby'
import {Container} from '@roots/container'
import {boundMethod as bind} from 'autobind-decorator'

export class FileContainer extends Container {
  /**
   * FS-Extra library
   */
  public fs: typeof fs = fs

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
  public constructor(baseDir?: string) {
    super()
    this._baseDir = baseDir
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
  @bind
  public setDisk(glob: string[]): this {
    sync(glob ?? ['*', '**/*', '!vendor', '!node_modules'], {
      onlyFiles: false,
      cwd: this._baseDir,
      expandDirectories: true,
    }).map((file: any) => {
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
  @bind
  public ls(key?: string): any {
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
  @bind
  public has(key: string): boolean {
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
  @bind
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
  @bind
  public exists(key: string): boolean {
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
  @bind
  public ensure(key: string): void {
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
  @bind
  public ensureDir(key: string): void {
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
  @bind
  public read(key: string): string {
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
  @bind
  public readJson(key: string): {[key: string]: any} {
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
  @bind
  public write(key: string, content: string): void {
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
  @bind
  public writeJson(key: string, content: string): void {
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
  @bind
  public require(key: string): NodeModule {
    return require(this.get(key))
  }
}
