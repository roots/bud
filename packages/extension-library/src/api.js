"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.library = void 0;
const autodll_webpack_plugin_1 = __importDefault(require("autodll-webpack-plugin"));
const library = function (modules) {
    this.use([
        [
            'autodll-webpack-plugin',
            {
                options: () => ({
                    debug: false,
                    inject: false,
                    filename: '[name].[hash].js',
                    entry: {
                        library: modules,
                    },
                    path: 'dll',
                    inherit: false,
                    context: this.src(),
                }),
                make: opts => new autodll_webpack_plugin_1.default(opts.all()),
            },
        ],
    ]);
    return this;
};
exports.library = library;
//# sourceMappingURL=api.js.map