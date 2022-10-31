import type {PathLike, ReadStream, WriteStream} from 'node:fs'
import type {CreateWriteStreamOptions} from 'node:fs/promises'
import {join} from 'node:path'

import * as filesystem from 'fs-jetpack'
import type {
  AppendData,
  AppendOptions,
  CopyOptions,
  DirCriteria,
  ExistsResult,
  FindOptions,
  FSJetpack,
  InspectOptions,
  InspectResult,
  InspectTreeOptions,
  InspectTreeResult,
  MoveOptions,
  WritableData,
  WriteOptions,
} from 'fs-jetpack/types'
import {bind} from 'helpful-decorators'
import isNumber from 'lodash-es/isNumber.js'

import * as json from './json.js'
import * as yml from './yml.js'

/**
 * Filesystem
 *
 * @public
 */
export default class Filesystem {
  /**
   * FS Jetpack instance
   *
   * @public
   */
  public fs: FSJetpack = filesystem

  /**
   * Instances
   *
   * @public
   */
  public instances: Map<string, Filesystem> = new Map()

  /**
   * Class constructor
   *
   * @internal
   */
  public constructor(...pathParts: Array<string>) {
    this.fs = filesystem.cwd(...pathParts)
  }

  /**
   * Returns Current Working Directory (CWD) for this instance of jetpack, or creates new jetpack object with given path as its internal CWD.
   *
   * @param pathParts - (optional) path (or many path parts) to become new CWD. Could be absolute, or relative.
   *  If relative path given new CWD will be resolved basing on current CWD of this jetpack instance.
   * @public
   *
   * @public
   * @decorator {@link bind | bind}
   */
  @bind
  public make(...pathParts: string[]): Filesystem {
    const key = join(...pathParts)
    if (this.instances.has(key)) return this.instances.get(key)

    const instance = new Filesystem(...pathParts)
    this.instances.set(key, instance)

    return this.instances.get(key)
  }

  /**
   * Create a {@link ReadStream}
   *
   * @public
   * @decorator {@link bind | @bind}
   */
  @bind
  public async createReadStream(
    path: string,
    options?: any,
  ): Promise<ReadStream> {
    return this.fs.createReadStream(path, options)
  }

  /**
   * Create a {@link WriteStream}
   *
   * @public
   * @decorator {@link bind | @bind}
   */
  @bind
  public async createWriteStream(
    path: PathLike,
    options?: BufferEncoding | CreateWriteStreamOptions,
  ): Promise<WriteStream> {
    return this.fs.createWriteStream(path, options)
  }

  /**
   * Appends given data to the end of file. If file or any parent directory doesn't exist it will be created.
   *
   * @param path - the path to file.
   * @param data - data to append (can be `String` or `Buffer`).
   * @param options - options
   *
   * @public
   * @decorator {@link bind}
   */
  @bind
  public async append(
    path: string,
    data: AppendData,
    options?: AppendOptions,
  ): Promise<Filesystem> {
    this.fs.appendAsync(path, data, options) // returns void

    return this
  }

  /**
   * Copies given file or directory (with everything inside).
   *
   * @param from - path to location you want to copy.
   * @param to - path to destination location, where the copy should be placed.
   * @param options - copy options
   * @public
   */
  public async copy(
    from: string,
    to: string,
    options?: CopyOptions,
  ): Promise<Filesystem> {
    this.fs.copyAsync(from, to, options) // returns void
    return this
  }

  /**
   * Ensures that directory on given path exists and meets given criteria. If any criterium is not met it will be
   * after this call. If any parent directory in `path` doesn't exist it will be created (like `mkdir -p`).
   *
   * @param path - path to directory to examine
   * @param criteria - criteria to be met by the directory
   * @public
   */
  public async dir(
    path: string,
    criteria?: DirCriteria,
  ): Promise<Filesystem> {
    this.fs.dirAsync(path, criteria)
    return this
  }

  /**
   * Checks whether something exists on given `path`. This method returns values more specific than `true/false` to
   * protect from errors like "I was expecting directory, but it was a file".
   *
   * @param path - path to look for
   *
   * Returns:
   *  - `false` if path doesn't exist.
   *  - `"dir"` if path is a directory.
   *  - `"file"` if path is a file.
   *  - `"other"` if none of the above.
   * @public
   */
  public async exists(...path: Array<string>): Promise<ExistsResult> {
    const pathResults = await this.path(...path)
    return this.fs.existsAsync(pathResults)
  }

  /**
   * Finds in directory specified by `path` all files fulfilling `searchOptions`.
   *
   * @remarks Returned paths are relative to current CWD of fs instance.
   *
   * @param options - search options
   * @public
   */
  public async find(
    options?: FindOptions | string | Array<string>,
  ): Promise<string[]> {
    if (typeof options === `string` || Array.isArray(options)) {
      return this.fs.findAsync({matching: options})
    }

    return this.fs.findAsync(options)
  }

  /**
   * Inspects given path (replacement for `fs.stat`). Returned object by default contains only very basic, not
   * platform-dependent properties (so you have something e.g. your unit tests can rely on), you can enable more
   * properties through options object.
   *
   * @param path - path to inspect
   * @param options - inspect options
   * @public
   */
  public async inspect(
    path: string,
    options?: InspectOptions,
  ): Promise<InspectResult | undefined> {
    return this.fs.inspectAsync(path, options)
  }

  /**
   * Calls inspect recursively on given path so it creates a tree of all directories and sub-directories inside it.
   *
   * @param path - starting path to inspect
   * @param options - inspect options
   * @public
   */
  public async inspectTree(
    path: string,
    options?: InspectTreeOptions,
  ): Promise<InspectTreeResult | undefined> {
    return this.fs.inspectTreeAsync(path, options)
  }

  /**
   * Lists the contents of directory. Equivalent of `fs.readdir`.
   *
   * @param path - directory to list
   * @public
   */
  public async list(path?: string): Promise<string[] | undefined> {
    return this.fs.listAsync(path)
  }

  /**
   * Moves given path to new location.
   *
   * @param from - path
   * @param to - path
   * @param options - move options
   * @public
   */
  public async move(
    from: string,
    to: string,
    options?: MoveOptions,
  ): Promise<Filesystem> {
    this.fs.moveAsync(from, to, options) // returns void

    return this
  }

  /**
   * Get path
   *
   * @param pathParts - string or array of string path parts
   * @returns
   */
  public async path(...pathParts: string[]): Promise<string> {
    return join(...pathParts)
  }

  /**
   * Reads content of file.
   *
   * @param path - path to file
   * @param returnAs - a custom return type (`utf8`, `json` or `buffer`)
   * @public
   */
  public async read(path: string, returnAs?: `utf8` | `json` | `buffer`) {
    if (returnAs === `json` || (!returnAs && path.endsWith(`.json`))) {
      return await json.read(path)
    }

    if (!returnAs && (path.endsWith(`.yml`) || path.endsWith(`.yaml`)))
      return await yml.read(path)

    if (returnAs === `utf8`) return await this.fs.readAsync(path, returnAs)
    if (returnAs === `buffer`)
      return await this.fs.readAsync(path, returnAs)

    return await this.fs.readAsync(path)
  }

  /**
   * Deletes given path, no matter what it is (file, directory or non-empty directory). If path already doesn't exist
   * terminates gracefully without throwing, so you can use it as 'ensure path doesn't exist'.
   *
   * @param path - path to delete
   * @public
   * @decorator {@link bind | bind}
   */
  @bind
  public async remove(path?: string): Promise<Filesystem> {
    this.fs.removeAsync(path) // returns void

    return this
  }

  /**
   * Creates symbolic link.
   *
   * @param symlinkValue - path where symbolic link should point.
   * @param path -  where symbolic link should be put.
   *
   * @public
   * @decorator {@link bind | bind}
   */
  public async symlink(
    symlinkValue: string,
    path: string,
  ): Promise<Filesystem> {
    this.fs.symlinkAsync(symlinkValue, path) // returns void

    return this
  }

  /**
   * Writes data to file. If any parent directory in `path` doesn't exist it will be created (like `mkdir -p`).
   *
   * @remarks
   * JSON5 is not compatible with `atomic` and `mode`. You should convert your JSON5 to JSON before writing it, or write it as a string.
   *
   * @param path - path to file
   * @param data - {@link WritableData | data to write}
   * @param options - {@link json.WriteOptions | write options}
   *
   * @public
   * @decorator {@link bind | bind}
   */
  @bind
  public async write(
    path: string,
    data: WritableData,
    options?: {
      replacer?: json.WriteOptions[`replacer`]
      space?: json.WriteOptions[`space`]
      mode?: string | number
      atomic?: boolean
    },
  ): Promise<Filesystem> {
    if (
      typeof data === `object` &&
      (!options || options.replacer) &&
      !options?.atomic &&
      !options?.mode
    ) {
      await json.write(path, data, options)

      return this
    }

    const writeProps: WriteOptions = {}

    if (options && options.mode)
      Object.assign(writeProps, {mode: options.mode})

    if (options && options.atomic)
      Object.assign(writeProps, {atomic: options.atomic})

    if (options && options.space)
      Object.assign(writeProps, {
        jsonIndent: !isNumber(options.space)
          ? parseInt(options.space)
          : options.space,
      })

    this.fs.writeAsync(path, data, writeProps) // returns void

    return this
  }
}
