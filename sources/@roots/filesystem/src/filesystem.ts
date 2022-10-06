import type {PathLike, ReadStream, WriteStream} from 'fs'
import type {CreateWriteStreamOptions} from 'fs/promises'
import filesystem from 'fs-jetpack'
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
  RenameOptions,
  TmpDirOptions,
  WritableData,
  WriteOptions,
} from 'fs-jetpack/types'

import * as json from './json.js'

export default class Filesystem {
  public fs: FSJetpack = filesystem

  public cwd(...pathParts: string[]): Filesystem {
    this.fs = filesystem.cwd(...pathParts)
    return this
  }

  public async chain(
    ...tasks: Array<(fs: Filesystem) => Promise<unknown>>
  ): Promise<Filesystem> {
    for (const task of tasks) {
      await task(this)
    }

    return this
  }

  public createReadStream(path: string, options?: any): ReadStream {
    return filesystem.createReadStream(path, options)
  }

  public createWriteStream(
    path: PathLike,
    options?: BufferEncoding | CreateWriteStreamOptions,
  ): WriteStream {
    return filesystem.createWriteStream(path, options)
  }

  /**
   * Appends given data to the end of file. If file or any parent directory doesn't exist it will be created.
   *
   * @param path - the path to file.
   * @param data - data to append (can be `String` or `Buffer`).
   * @param options - options
   */
  public async append(
    path: string,
    data: AppendData,
    options?: AppendOptions,
  ): Promise<Filesystem> {
    await filesystem.appendAsync(path, data, options)
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
    await filesystem.copyAsync(from, to, options)
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
    this.fs = await filesystem.dirAsync(path, criteria)
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
  public async exists(path: string): Promise<ExistsResult> {
    return await filesystem.existsAsync(path)
  }

  /**
   * Finds in directory specified by `path` all files fulfilling `searchOptions`.
   *
   * @remarks Returned paths are relative to current CWD of fs instance.
   * @param options - search options
   * @public
   */
  public async find(options?: FindOptions): Promise<string[]> {
    return await filesystem.findAsync(options)
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
    return await filesystem.inspectAsync(path, options)
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
    return await filesystem.inspectTreeAsync(path, options)
  }

  public async list(path?: string): Promise<string[] | undefined> {
    return await filesystem.listAsync(path)
  }

  public async move(
    from: string,
    to: string,
    options?: MoveOptions,
  ): Promise<Filesystem> {
    await filesystem.moveAsync(from, to, options)
    return this
  }

  public path(...pathParts: string[]): string {
    return filesystem.path(...pathParts)
  }

  public async read(
    path: string,
    returnAs: 'utf8' | 'json' | 'buffer',
  ): Promise<string | Buffer | Record<string, any>> {
    if (returnAs === `json`) {
      return await json.read(path)
    }

    await filesystem.readAsync(path)
    return this
  }

  public async remove(path?: string): Promise<Filesystem> {
    await filesystem.removeAsync(path)
    return this
  }

  public async rename(
    path: string,
    newName: string,
    options?: RenameOptions,
  ): Promise<Filesystem> {
    await filesystem.renameAsync(path, newName, options)
    return this
  }

  public async symlink(
    symlinkValue: string,
    path: string,
  ): Promise<Filesystem> {
    await filesystem.symlinkAsync(symlinkValue, path)
    return this
  }

  public async tmpDir(options?: TmpDirOptions): Promise<Filesystem> {
    await filesystem.tmpDirAsync(options)
    return this
  }

  public async write(
    path: string,
    data: WritableData,
    options?: WriteOptions,
  ): Promise<Filesystem> {
    await filesystem.writeAsync(path, data, options)
    return this
  }
}
