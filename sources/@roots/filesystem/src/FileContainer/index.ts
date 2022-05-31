import {globbySync} from 'globby'
import {Container} from '@roots/container'
import {bind} from 'helpful-decorators'
import * as fs from 'fs-extra'
import {get, has, set} from 'lodash-es'
import * as path from 'node:path'
import resolve from 'resolve-from'

export class FileContainer extends Container {
  /**
   * FS-Extra library
   */
  private _fs: typeof fs = fs
  public get fs(): typeof fs {
    return this._fs
  }

  /**
   * PlatformPath
   */
  private _path: path.PlatformPath = path
  public get path(): path.PlatformPath {
    return this._path
  }

  /**
   * resolve
   */
  private _resolve: typeof resolve = resolve
  public get resolve(): typeof resolve {
    return this._resolve
  }

  /**
   * Base directory
   */
  private _baseDir: string = process.cwd()
  public get baseDir(): string {
    return this._baseDir
  }
  public set baseDir(dir: string) {
    this._baseDir = dir
  }

  /**
   * Class constructor.
   */
  public constructor(baseDir?: string) {
    super()

    this._baseDir = baseDir
  }

  /**
   * Establish the disk repository from an array of globs.
   *
   * @example
   * ```js
   * fsInstance.setDisk(['*.js', '!*.css.js'])
   * ```
   */
  @bind
  public setDisk(glob: string[]): this {
    globbySync(glob ?? ['*', '**/*', '!vendor', '!node_modules'], {
      onlyFiles: false,
      cwd: this._baseDir,
      expandDirectories: true,
    }).map((file: any) => {
      this.set(file, path.join(this.baseDir, file))
    })

    return this
  }

  /**
   * List repository contents.
   *
   * @example
   */
  @bind
  public ls(key?: string): any {
    return key ? get(this.repository, key) : this.repository
  }

  /**
   * Return boolean `true` if key is a match.
   *
   * @example
   * ```js
   * fsInstance.has('some/file.js')
   * ```
   */
  @bind
  public has(key: string): boolean {
    return has(this.repository, key)
  }

  /**
   * Set a value.
   *
   * @example
   * ```js
   * fsInstance.set('some/file.js', '/absolute/path/to/some/file.js')
   * ```
   */
  @bind
  public set(key: string, value: any): this {
    set(this.repository, [`${key}`], value)

    return this
  }

  /**
   * Return a boolean `true` if repository has a key and it's value
   * resolves to an actual disk location.
   *
   * @example
   * ```js
   * fsInstance.exists('some/file.js')
   * ```
   */
  @bind
  public exists(key: string): boolean {
    return this.fs.existsSync(this.get(key))
  }

  /**
   * Create a file if it does not already exist. Will also create an
   * associated repository entry if it doesn't exist.
   *
   * @example
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
   * Create a directory if it does not already exist. Will also create an
   * associated repository entry if it doesn't exist.
   *
   * @example
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
   * Read file contents as a utf8 encoded string.
   *
   * @example
   * ```js
   * fsInstance.read('some/file.md')
   * ```
   */
  @bind
  public read(key: string): string {
    return this.fs.readFileSync(this.get(key), 'utf8')
  }

  /**
   * Retrieve file contents as a javascript object.
   *
   * @example
   * ```js
   * fsInstance.readJson('some.file.json')
   * // => {json: 'contents', as: 'an object'}
   * ```
   */
  @bind
  public readJson(key: string): {[key: string]: any} {
    return this.fs.readJsonSync(this.get(key))
  }

  /**
   * Write file contents as a string
   *
   * @example
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
   * Write file contents as a JSON object.
   *
   * @example
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
   * NodeRequire a matching file as a module
   *
   * @example
   * ```js
   * fsInstance.require('path/to/module.js')
   * ```
   */
  @bind
  public require(key: string): NodeModule {
    return require(this.get(key))
  }
}
