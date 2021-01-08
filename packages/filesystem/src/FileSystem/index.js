"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
const lodash_1 = __importDefault(require("lodash"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const __1 = require("..");
const container_1 = require("@roots/container");
class FileSystem extends container_1.Container {
    constructor() {
        super(...arguments);
        /**
         * fs util
         *
         * @see fs-extra
         */
        this.fs = fs_extra_1.default;
        /**
         * cwd
         */
        this.path = path_1.default;
        /**
         * Base directory
         */
        this._baseDir = process.cwd();
    }
    get baseDir() {
        return this._baseDir;
    }
    set baseDir(baseDir) {
        this._baseDir = baseDir;
    }
    /**
     * Get
     *
     * Call without a key to get all disks.
     * Pass a key to get a specific disk.
     */
    get(key) {
        return key ? lodash_1.default.get(this.repository, key) : this.current;
    }
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
    make(key, options) {
        var _a, _b;
        const baseDir = (_a = options === null || options === void 0 ? void 0 : options.baseDir) !== null && _a !== void 0 ? _a : this.baseDir;
        this.set(key, // with this key
        new __1.FileContainer(baseDir).setDisk([
            ...((_b = options === null || options === void 0 ? void 0 : options.glob) !== null && _b !== void 0 ? _b : ['*', '**/*']).map(globStr => this.path.resolve(baseDir, globStr)),
        ]));
        this.current = this.get(key);
        return this.current;
    }
}
exports.FileSystem = FileSystem;
//# sourceMappingURL=index.js.map