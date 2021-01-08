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
exports.Plugin = void 0;
const webpack_sources_1 = require("webpack-sources");
const path_1 = __importDefault(require("path"));
const tapable_1 = require("tapable");
class Plugin {
    /**
     * Class constructor
     */
    constructor(options = {
        name: 'entrypoints.json',
        writeToFileEmit: true,
    }) {
        /**
         * Plugin ident
         */
        this.plugin = {
            name: 'EntrypointsManifestPlugin',
            stage: Infinity,
        };
        /**
         * Hook: webpack compilation output.
         */
        this.hook = ['compilation', 'output'];
        /**
         * Emitted contents
         */
        this.output = {};
        Object.assign(this, options);
        this.emit = this.emit.bind(this);
        this.apply = this.apply.bind(this);
        this.makeEntry = this.makeEntry.bind(this);
        this.entrypoints = this.entrypoints.bind(this);
    }
    /**
     * Webpack apply plugin
     */
    apply(compiler) {
        this.publicPath = compiler.options.output.publicPath;
        this.path = path_1.default.resolve(compiler.options.output.path, this.name);
        this.file = path_1.default.relative(compiler.options.output.path, this.path);
        compiler.hooks.emit.tapAsync(this.plugin, this.emit);
    }
    /**
     * Emit manifest
     */
    emit(compilation, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const { assets, entrypoints, hooks, hash, } = compilation;
            this.hash = hash !== null && hash !== void 0 ? hash : null;
            hooks.entrypoints = new tapable_1.SyncWaterfallHook(this.hook);
            hooks.entrypoints.tap(this.plugin, this.entrypoints);
            hooks.entrypoints.call(entrypoints, this.output);
            if (this.writeToFileEmit) {
                assets[this.file] = new webpack_sources_1.RawSource(JSON.stringify(this.output));
            }
            callback();
        });
    }
    /**
     * Map entrypoints to output
     */
    entrypoints(entrypoints) {
        entrypoints.forEach(entry => {
            this.makeEntry(entry.name);
            entry.chunks.map(chunk => {
                chunk.files.map(file => {
                    this.pushChunk(entry.name, file.split('.').pop(), path_1.default.join(this.publicPath, file));
                });
            });
        });
    }
    /**
     * Assign entrypoint to output property
     */
    makeEntry(name) {
        this.output[name] = {
            version: this.hash,
            js: [],
            css: [],
        };
    }
    /**
     * Push chunk onto existing manifest entry.
     */
    pushChunk(name, type, entry) {
        this.output[name][type].push(entry);
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=index.js.map