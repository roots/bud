"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.vue = void 0;
var vue_loader_1 = require("vue-loader");
/** Patched compiler.*/
var vue_template_compiler_1 = __importDefault(require("./vue-template-compiler"));
var loader = require.resolve('vue-loader');
var addVueStyle = function (loaders) { return __spreadArrays([
    'vue-style-loader'
], loaders); };
var vue = function (bud) { return ({
    bud: bud,
    name: 'vue',
    make: function () {
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.vue') && this.bud.addExtensions(['vue']);
        this.bud.alias({ vue$: 'vue/dist/vue.esm.js' });
        this.bud.patterns.set('vue', /\.vue$/);
        this.bud.loaders.set('vue', function () { return ({
            loader: loader,
            options: {
                compiler: vue_template_compiler_1["default"]
            }
        }); });
        this.bud.rules.set('vue', function (bud) { return ({
            test: bud.patterns.get('vue'),
            exclude: function (file) {
                return bud.patterns.get('vendor').test(file) &&
                    !/\.vue\.js/.test(file);
            },
            use: [bud.loaders.get('vue')]
        }); });
        this.bud.plugins.set('vue-loader-plugin', function () { return ({
            make: function () {
                return new vue_loader_1.VueLoaderPlugin();
            }
        }); });
        this.bud.hooks.on('webpack.module.rules.css.use', addVueStyle);
        this.bud.hooks.on('webpack.module.rules.scss.use', addVueStyle);
    }
}); };
exports.vue = vue;
//# sourceMappingURL=index.js.map