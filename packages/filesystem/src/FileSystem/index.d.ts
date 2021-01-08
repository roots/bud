/// <reference types="node" />
import fs from 'fs-extra';
import path from 'path';
import { FileContainer } from '..';
import { Container } from '@roots/container';
export declare class FileSystem extends Container<FileContainer> {
    /**
     * fs util
     *
     * @see fs-extra
     */
    fs: typeof fs;
    /**
     * cwd
     */
    path: typeof path;
    /**
     * Current disk
     */
    current: FileContainer;
    /**
     * Base directory
     */
    protected _baseDir: string;
    get baseDir(): string;
    set baseDir(baseDir: string);
    /**
     * Get
     *
     * Call without a key to get all disks.
     * Pass a key to get a specific disk.
     */
    get(key?: string): FileContainer;
    /**
     * Make
     *
     * Create a new disk. Provide a name, root directory, and -- optionally --
     * a custom glob array. [🔗 Documentation on bud.disk](#)
     *
     * ### Usage
     *
     * ```js
     * fs.set(
     *   'icons',
     *   bud.project('assets/icons'),
     *   ['*.svg'],
     * )
     * ```
     */
    make(key: string, options?: {
        baseDir?: string;
        glob?: string[];
    }): this['current'];
}
//# sourceMappingURL=index.d.ts.map