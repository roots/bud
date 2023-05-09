/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import type { PathLike, ReadStream, WriteStream } from 'node:fs';
import type { CreateWriteStreamOptions } from 'node:fs/promises';
import type { AppendData, AppendOptions, CopyOptions, DirCriteria, ExistsResult, FindOptions, FSJetpack, InspectOptions, InspectResult, InspectTreeOptions, InspectTreeResult, MoveOptions, WritableData, WriteOptions } from 'fs-jetpack/types.js';
import * as json from './json.js';
/**
 * Filesystem
 */
export default class Filesystem {
    /**
     * FS Jetpack instance
     */
    fs: FSJetpack;
    /**
     * Instances
     */
    instances: Map<string, Filesystem>;
    /**
     * Class constructor
     */
    constructor(...pathParts: Array<string>);
    /**
     * Create a {@link ReadStream}
     */
    createReadStream(path: string, options?: any): ReadStream;
    /**
     * Create a {@link WriteStream}
     */
    createWriteStream(path: PathLike, options?: BufferEncoding | CreateWriteStreamOptions): WriteStream;
    /**
     * Appends given data to the end of file. If file or any parent directory doesn't exist it will be created.
     *
     * @param path - the path to file.
     * @param data - data to append (can be `String` or `Buffer`).
     * @param options - options
     */
    append(path: string, data: AppendData, options?: AppendOptions): Promise<Filesystem>;
    /**
     * Copies given file or directory (with everything inside).
     *
     * @param from - path to location you want to copy.
     * @param to - path to destination location, where the copy should be placed.
     * @param options - copy options
     */
    copy(from: string, to: string, options?: CopyOptions): Promise<Filesystem>;
    /**
     * Ensures that directory on given path exists and meets given criteria. If any criterium is not met it will be
     * after this call. If any parent directory in `path` doesn't exist it will be created (like `mkdir -p`).
     *
     * @param path - path to directory to examine
     * @param criteria - criteria to be met by the directory
     */
    dir(path: string, criteria?: DirCriteria): Promise<Filesystem>;
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
     */
    exists(...path: Array<string>): Promise<ExistsResult>;
    /**
     * Finds in directory specified by `path` all files fulfilling `searchOptions`.
     *
     * @remarks Returned paths are relative to current CWD of fs instance.
     *
     * @param options - search options
     */
    find(options?: FindOptions | string | Array<string>): Promise<string[]>;
    /**
     * Inspects given path (replacement for `fs.stat`). Returned object by default contains only very basic, not
     * platform-dependent properties (so you have something e.g. your unit tests can rely on), you can enable more
     * properties through options object.
     *
     * @param path - path to inspect
     * @param options - inspect options
     */
    inspect(path: string, options?: InspectOptions): Promise<InspectResult | undefined>;
    /**
     * Calls inspect recursively on given path so it creates a tree of all directories and sub-directories inside it.
     *
     * @param path - starting path to inspect
     * @param options - inspect options
     */
    inspectTree(path: string, options?: InspectTreeOptions): Promise<InspectTreeResult | undefined>;
    /**
     * Lists the contents of directory. Equivalent of `fs.readdir`.
     *
     * @param path - directory to list
     */
    list(path?: string): Promise<string[] | undefined>;
    /**
     * Moves given path to new location.
     *
     * @param from - path
     * @param to - path
     * @param options - move options
     */
    move(from: string, to: string, options?: MoveOptions): Promise<Filesystem>;
    /**
     * Get path
     *
     * @param pathParts - string or array of string path parts
     * @returns
     */
    path(...pathParts: string[]): Promise<string>;
    /**
     * Reads content of file.
     *
     * @param path - path to file
     * @param type - a custom return type (`utf8`, `json` or `buffer`)
     */
    read(path: string, type?: `utf8` | `buffer`): Promise<any>;
    /**
     * Deletes given path, no matter what it is (file, directory or non-empty directory). If path already doesn't exist
     * terminates gracefully without throwing, so you can use it as 'ensure path doesn't exist'.
     *
     * @param path - path to delete
     */
    remove(path?: string): Promise<Filesystem>;
    /**
     * Creates symbolic link.
     *
     * @param symlinkValue - path where symbolic link should point.
     * @param path -  where symbolic link should be put.
     */
    symlink(symlinkValue: string, path: string): Promise<Filesystem>;
    /**
     * Writes data to file. If any parent directory in `path` doesn't exist it will be created (like `mkdir -p`).
     *
     * @remarks
     * JSON5 is not compatible with `atomic` and `mode`. You should convert your JSON5 to JSON before writing it, or write it as a string.
     *
     * @param path - path to file
     * @param data - {@link WritableData | data to write}
     * @param options - {@link json.WriteOptions | write options}
     */
    write(path: string, data: WritableData, options?: {
        replacer?: json.WriteOptions[`replacer`];
        space?: json.WriteOptions[`space`];
        mode?: string | number;
        atomic?: boolean;
    }): Promise<Filesystem>;
}
export type { AppendData, AppendOptions, CopyOptions, DirCriteria, ExistsResult, FindOptions, FSJetpack, InspectOptions, InspectResult, InspectTreeOptions, InspectTreeResult, MoveOptions, WritableData, WriteOptions, };
//# sourceMappingURL=filesystem.d.ts.map