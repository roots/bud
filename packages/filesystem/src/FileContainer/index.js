"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContainer = void 0;
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs-extra"));
const globby_1 = __importDefault(require("globby"));
const resolve_from_1 = __importDefault(require("resolve-from"));
const lodash_1 = __importDefault(require("lodash"));
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
class FileContainer {
    /**
     * Class constructor.
     */
    constructor(baseDir) {
        /**
         * Globby library.
         */
        this.glob = globby_1.default;
        /**
         * PlatformPath
         */
        this.path = path_1.default;
        /**
         * resolveFrom (better resolve)
         */
        this.from = resolve_from_1.default;
        /**
         * Base directory
         */
        this.base = process.cwd();
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
        this.setBase = function (dir) {
            this.base = dir;
        };
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
        this.getBase = function () {
            return this.base;
        };
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
        this.setDisk = function (glob) {
            const files = this.glob.sync(glob, {
                onlyFiles: false,
                expandDirectories: true,
            });
            this.repository = files.reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr.replace(`${this.base}`, '')]: curr })), {});
            Object.getOwnPropertyNames(this)
                .filter(name => name !== 'repository')
                .map(name => {
                Object.defineProperty(this, name, {
                    enumerable: false,
                });
            });
        };
        /**
         * ## fs.ls
         *
         * List repository contents.
         *
         * ### Usage
         *
         */
        this.ls = function (key) {
            return key ? lodash_1.default.get(this.repository, key) : this.repository;
        };
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
        this.get = function (key) {
            return lodash_1.default.get(this.repository, key);
        };
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
        this.has = function (key) {
            return lodash_1.default.has(this.repository, key);
        };
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
        this.set = function (key, value) {
            lodash_1.default.set(this.repository, key, value);
        };
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
        this.exists = function (key) {
            return this.fs.existsSync(this.get(key));
        };
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
        this.ensure = function (key) {
            const file = this.has(key)
                ? this.get(key)
                : this.path.resolve(this.base, key);
            this.fs.ensureFileSync(file);
            this.set(key, file);
        };
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
        this.ensureDir = function (key) {
            const dir = this.has(key)
                ? this.get(key)
                : this.path.resolve(this.base, key);
            this.fs.ensureDirSync(dir);
            this.set(key, dir);
        };
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
        this.read = function (key) {
            return this.fs.readFileSync(this.get(key), 'utf8');
        };
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
        this.readJson = function (key) {
            return this.fs.readJsonSync(this.get(key));
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
        this.write = function (key, content) {
            const file = this.has(key)
                ? this.get(key)
                : this.path.resolve(this.base, key);
            this.fs.writeFileSync(file, content);
            this.set(key, file);
        };
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
        this.writeJson = function (key, content) {
            const file = this.has(key)
                ? this.get(key)
                : this.path.resolve(this.base, key);
            this.fs.writeJsonSync(file, content);
            this.set(key, file);
        };
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
        this.require = function (key) {
            return require(this.get(key));
        };
        this.fs = fs;
        this.setBase = this.setBase.bind(this);
        this.exists = this.exists.bind(this);
        this.setDisk = this.setDisk.bind(this);
        if (baseDir) {
            this.setBase(baseDir);
        }
    }
}
exports.FileContainer = FileContainer;
//# sourceMappingURL=index.js.map