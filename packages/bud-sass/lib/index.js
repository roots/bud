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
exports.sass = void 0;
var api_1 = require("./api");
var use_1 = __importDefault(require("./use"));
/**
 * Sass webpack module rule.
 *
 * @type {Rule}
 */
var rule = function (bud) { return ({
    test: /\.s(c|a)ss$/,
    exclude: bud.patterns.get('vendor'),
    use: [
        bud.inProduction
            ? bud.uses.get('miniCss')(bud)
            : bud.loaders.get('style'),
        bud.uses.get('css')(bud),
        bud.uses.get('resolveUrl')(bud),
        bud.uses.get('postCss')(bud),
        use_1["default"](bud),
    ]
}); };
/**
 * Bud extension: sass
 *
 * Adds sass support to the Bud framework.
 *
 * @type {Extension}
 */
var sass = function (bud) { return ({
    bud: bud,
    name: 'sass',
    make: function () {
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.sass') &&
            this.bud.options.set('webpack.resolve.extensions', __spreadArrays(this.bud.options.get('webpack.resolve.extensions'), [
                '.sass',
            ]));
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.scss') &&
            this.bud.options.set('webpack.resolve.extensions', __spreadArrays(this.bud.options.get('webpack.resolve.extensions'), [
                '.scss',
            ]));
        if (!this.bud.options.has('sass')) {
            this.bud.options.set('sass', {
                sourceMap: true
            });
        }
        this.bud.apply('sass', api_1.config);
        this.bud.rules.push(rule);
    }
}); };
exports.sass = sass;
//# sourceMappingURL=index.js.map