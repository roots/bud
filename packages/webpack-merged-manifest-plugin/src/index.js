"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const prettier_1 = require("prettier");
class MergedManifestWebpackPlugin {
    /**
     * Class constructor
     */
    constructor(options) {
        /**
         * Plugin ident.
         */
        this.plugin = {
            name: 'MergedManifestPlugin',
        };
        /**
         * Output filename
         */
        this.file = 'entrypoints.json';
        /**
         * Entrypoints filename
         */
        this.entrypointsName = 'entrypoints.json';
        /**
         * Externals filename
         */
        this.wordpressName = 'wordpress.json';
        /**
         * Webpack.Compilation.CompilerHooks['done']['tapAsync']
         */
        this.done = function (_compilation, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                /**
                 * Callback early if a required manifest is missing.
                 */
                if (!this.isBuildable()) {
                    return callback;
                }
                /**
                 * Read manifests.
                 */
                try {
                    const entrypointsManifest = yield this.manifestContent(this.entrypointsName);
                    const wordpressManifest = yield this.manifestContent(this.wordpressName);
                    /**
                     * Reduce aggregate manifest and write to file.
                     */
                    yield fs_extra_1.default.outputFile(this.path, this.format(Object.entries(entrypointsManifest).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: Object.assign(Object.assign({}, value), { dependencies: wordpressManifest[key] }) })), {})));
                    /**
                     * Remove wordpress.json manifest.
                     */
                    yield fs_extra_1.default.remove(this.manifestPath(this.wordpressName));
                }
                catch (err) {
                    console.error(err);
                }
                return callback();
            });
        };
        options &&
            Object.keys(options).map(prop => {
                Object.assign(this, { [prop]: options[prop] });
            });
        this.done = this.done.bind(this);
        this.format = this.format.bind(this);
        this.isBuildable = this.isBuildable.bind(this);
        this.manifestPath = this.manifestPath.bind(this);
        this.manifestExists = this.manifestExists.bind(this);
        this.manifestContent = this.manifestContent.bind(this);
    }
    /**
     * Webpack apply plugin
     */
    apply(compiler) {
        this.dir = compiler.options.output.path;
        this.path = path_1.default.resolve(this.dir, this.file);
        compiler.hooks.done.tapAsync(this.plugin, this.done);
    }
    /**
     * Format manifest.
     */
    format(object) {
        return prettier_1.format(JSON.stringify(object), {
            parser: 'json',
            printWidth: 40,
        });
    }
    /**
     * Return true if all manifests are present.
     */
    isBuildable() {
        return (this.manifestExists(this.entrypointsName) &&
            this.manifestExists(this.wordpressName));
    }
    /**
     * Return full path of manifest.
     */
    manifestPath(file) {
        return path_1.default.resolve(this.dir, file);
    }
    /**
     * Return true if manifest is present.
     */
    manifestExists(file) {
        return fs_extra_1.default.existsSync(this.manifestPath(file));
    }
    /**
     * Return manifest contents as an object.
     */
    manifestContent(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fs_extra_1.default.readJson(this.manifestPath(file));
        });
    }
}
exports.default = MergedManifestWebpackPlugin;
//# sourceMappingURL=index.js.map