/// <reference types="node" />
import { PlatformPath } from 'path';
import * as fs from 'fs-extra';
import globby from 'globby';
import resolveFrom from 'resolve-from';
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
export declare class FileContainer {
    /**
     * FS-Extra library
     */
    fs: typeof fs;
    /**
     * Globby library.
     */
    glob: typeof globby;
    /**
     * PlatformPath
     */
    path: PlatformPath;
    /**
     * Virtual filesystem repository
     */
    repository: {
        [key: string]: string;
    };
    /**
     * resolveFrom (better resolve)
     */
    from: typeof resolveFrom;
    /**
     * Base directory
     */
    base: string;
    /**
     * Class constructor.
     */
    constructor(baseDir?: string);
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
    setBase: (dir: string) => void;
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
    getBase: () => string;
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
    setDisk: (glob: string[]) => void;
    /**
     * ## fs.ls
     *
     * List repository contents.
     *
     * ### Usage
     *
     */
    ls: (key?: string) => any;
    /**
     * ## get
     *
     * Get the path of a matching key
     *
     * ### Usage
     *
     * ```js
     * fsInstance.get('some/file.js')
     * ```
     */
    get: (key: string) => any;
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
    has: (key: string) => boolean;
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
    set: (key: string, value: string) => void;
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
    exists: (key: string) => boolean;
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
    ensure: (key: string) => void;
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
    ensureDir: (key: string) => void;
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
    read: (key: string) => string;
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
    readJson: (key: string) => {
        [key: string]: any;
    };
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
    write: (key: string, content: string) => void;
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
    writeJson: (key: string, content: string) => void;
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
    require: (key: string) => NodeModule;
}
//# sourceMappingURL=index.d.ts.map