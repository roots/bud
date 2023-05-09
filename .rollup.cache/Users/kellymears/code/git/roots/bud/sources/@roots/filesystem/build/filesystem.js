/* eslint-disable n/no-unpublished-import */
import { __decorate, __metadata } from "tslib";
import { join } from 'node:path';
import filesystem from 'fs-jetpack';
import { bind } from 'helpful-decorators';
import isNumber from 'lodash/isNumber.js';
import * as json from './json.js';
import * as yml from './yml.js';
/**
 * Filesystem
 */
export default class Filesystem {
    /**
     * Class constructor
     */
    constructor(...pathParts) {
        /**
         * FS Jetpack instance
         */
        this.fs = filesystem;
        /**
         * Instances
         */
        this.instances = new Map();
        this.fs =
            pathParts.length > 0 ? filesystem.cwd(...pathParts) : filesystem;
    }
    /**
     * Create a {@link ReadStream}
     */
    createReadStream(path, options) {
        return this.fs.createReadStream(path, options);
    }
    /**
     * Create a {@link WriteStream}
     */
    createWriteStream(path, options) {
        return this.fs.createWriteStream(path, options);
    }
    /**
     * Appends given data to the end of file. If file or any parent directory doesn't exist it will be created.
     *
     * @param path - the path to file.
     * @param data - data to append (can be `String` or `Buffer`).
     * @param options - options
     */
    async append(path, data, options) {
        await this.fs.appendAsync(path, data, options); // returns void
        return this;
    }
    /**
     * Copies given file or directory (with everything inside).
     *
     * @param from - path to location you want to copy.
     * @param to - path to destination location, where the copy should be placed.
     * @param options - copy options
     */
    async copy(from, to, options) {
        await this.fs.copyAsync(from, to, options); // returns void
        return this;
    }
    /**
     * Ensures that directory on given path exists and meets given criteria. If any criterium is not met it will be
     * after this call. If any parent directory in `path` doesn't exist it will be created (like `mkdir -p`).
     *
     * @param path - path to directory to examine
     * @param criteria - criteria to be met by the directory
     */
    async dir(path, criteria) {
        this.fs.dirAsync(path, criteria);
        return this;
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
     */
    async exists(...path) {
        const pathResults = await this.path(...path);
        return await this.fs.existsAsync(pathResults);
    }
    /**
     * Finds in directory specified by `path` all files fulfilling `searchOptions`.
     *
     * @remarks Returned paths are relative to current CWD of fs instance.
     *
     * @param options - search options
     */
    async find(options) {
        if (typeof options === `string` || Array.isArray(options)) {
            return this.fs.findAsync({ matching: options });
        }
        return await this.fs.findAsync(options);
    }
    /**
     * Inspects given path (replacement for `fs.stat`). Returned object by default contains only very basic, not
     * platform-dependent properties (so you have something e.g. your unit tests can rely on), you can enable more
     * properties through options object.
     *
     * @param path - path to inspect
     * @param options - inspect options
     */
    async inspect(path, options) {
        return await this.fs.inspectAsync(path, options);
    }
    /**
     * Calls inspect recursively on given path so it creates a tree of all directories and sub-directories inside it.
     *
     * @param path - starting path to inspect
     * @param options - inspect options
     */
    async inspectTree(path, options) {
        return await this.fs.inspectTreeAsync(path, options);
    }
    /**
     * Lists the contents of directory. Equivalent of `fs.readdir`.
     *
     * @param path - directory to list
     */
    async list(path) {
        return await this.fs.listAsync(path);
    }
    /**
     * Moves given path to new location.
     *
     * @param from - path
     * @param to - path
     * @param options - move options
     */
    async move(from, to, options) {
        await this.fs.moveAsync(from, to, options); // returns void
        return this;
    }
    /**
     * Get path
     *
     * @param pathParts - string or array of string path parts
     * @returns
     */
    async path(...pathParts) {
        return join(...pathParts);
    }
    /**
     * Reads content of file.
     *
     * @param path - path to file
     * @param type - a custom return type (`utf8`, `json` or `buffer`)
     */
    async read(path, type) {
        if (type === `utf8`)
            return await this.fs.readAsync(path, type);
        if (type === `buffer`)
            return await this.fs.readAsync(path, type);
        if (path.endsWith(`.json`) || path.endsWith(`.json5`)) {
            return await json.read(path);
        }
        if (path.endsWith(`.yml`) || path.endsWith(`.yaml`)) {
            return await yml.read(path);
        }
        return await this.fs.readAsync(path);
    }
    /**
     * Deletes given path, no matter what it is (file, directory or non-empty directory). If path already doesn't exist
     * terminates gracefully without throwing, so you can use it as 'ensure path doesn't exist'.
     *
     * @param path - path to delete
     */
    async remove(path) {
        await this.fs.removeAsync(path); // returns void
        return this;
    }
    /**
     * Creates symbolic link.
     *
     * @param symlinkValue - path where symbolic link should point.
     * @param path -  where symbolic link should be put.
     */
    async symlink(symlinkValue, path) {
        await this.fs.symlinkAsync(symlinkValue, path); // returns void
        return this;
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
     */
    async write(path, data, options) {
        if (typeof data === `object` &&
            (!options || options.replacer) &&
            !options?.atomic &&
            !options?.mode) {
            if (path.endsWith(`.yml`) || path.endsWith(`.yaml`)) {
                await yml.write(path, data);
                return this;
            }
            await json.write(path, data, options);
            return this;
        }
        const writeProps = {};
        if (options && options.mode)
            Object.assign(writeProps, { mode: options.mode });
        if (options && options.atomic)
            Object.assign(writeProps, { atomic: options.atomic });
        if (options && options.space)
            Object.assign(writeProps, {
                jsonIndent: !isNumber(options.space)
                    ? parseInt(options.space)
                    : options.space,
            });
        await this.fs.writeAsync(path, data, writeProps); // returns void
        return this;
    }
}
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Function)
], Filesystem.prototype, "createReadStream", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Function)
], Filesystem.prototype, "createWriteStream", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], Filesystem.prototype, "append", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Filesystem.prototype, "remove", null);
__decorate([
    bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], Filesystem.prototype, "write", null);
//# sourceMappingURL=filesystem.js.map