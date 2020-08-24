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
var adapter_1 = __importDefault(require("./adapter"));
var rule_1 = __importDefault(require("./rule"));
var addVueStyle = function (loaders) { return __spreadArrays([
    'vue-style-loader'
], loaders); };
/**
 * @roots/bud-vue
 *
 * Adds vue support to the Bud framework.
 */
var vue = function (bud) { return ({
    bud: bud,
    name: 'vue',
    make: function () {
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.vue') &&
            this.bud.options.set('webpack.resolve.extensions', __spreadArrays(this.bud.options.get('webpack.resolve.extensions'), [
                '.vue',
            ]));
        this.bud.adapters.add(adapter_1["default"]);
        this.bud.alias({
            vue$: 'vue/dist/vue.esm.js'
        });
        this.bud.rules.repository = __spreadArrays(this.bud.rules.repository, [rule_1["default"]]);
        this.bud.hooks.on('webpack.module.rules.css.use', addVueStyle);
        this.bud.hooks.on('webpack.module.rules.scss.use', addVueStyle);
    }
}); };
module.exports = vue;
//# sourceMappingURL=index.js.map