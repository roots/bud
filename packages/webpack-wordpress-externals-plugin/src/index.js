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
const webpack_1 = require("webpack");
const path_1 = __importDefault(require("path"));
const fetchExternals_1 = __importDefault(require("./fetchExternals"));
const externals_1 = require("./externals");
class Plugin {
    /**
     * Class constructor
     */
    constructor(options = {
        name: 'wordpress.json',
        writeToFileEmit: true,
        useElementAsReact: true,
    }) {
        // Ident
        this.plugin = {
            name: 'WordPressExternalsWebpackPlugin',
            stage: Infinity,
        };
        this.output = {
            dir: '',
            name: '',
            file: '',
            publicPath: null,
            content: {},
        };
        this.options = options;
        this.output.name = this.options.name;
        this.externals = new webpack_1.ExternalsPlugin('wp', externals_1.externals.bind(this));
        this.emit = this.emit.bind(this);
    }
    apply(compiler) {
        this.output.dir = compiler.options.output.path;
        this.output.publicPath = compiler.options.output.publicPath;
        this.output.file = path_1.default.resolve(this.output.dir, this.output.name);
        this.output.name = path_1.default.relative(this.output.dir, this.output.file);
        this.externals.apply(compiler);
        compiler.hooks.emit.tapAsync(this.constructor.name, this.emit.bind(this));
    }
    emit(compilation, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const externals = yield fetchExternals_1.default();
            compilation.entrypoints.forEach(entry => {
                entry.chunks.forEach(chunk => {
                    this.output.content[entry.name] = Array.from(chunk.modulesIterable).reduce((acc, module) => externals[module.userRequest]
                        ? [...acc, externals[module.userRequest].enqueue]
                        : acc, []);
                });
            });
            compilation.assets[this.output.name] = new webpack_sources_1.RawSource(JSON.stringify(this.output.content));
            callback();
        });
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=index.js.map