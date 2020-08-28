"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.sass = void 0;
/**
 * Bud extension: sass
 *
 * Adds sass support to the Bud framework.
 */
var sass = function (bud) { return ({
    bud: bud,
    make: function () {
        this.bud.addExtensions(['sass', 'scss']);
        if (!this.bud.options.has('sass')) {
            this.bud.options.set('sass', {
                sourceMap: true
            });
        }
        this.bud.uses.set('sass', function (bud) { return ({
            loader: require.resolve('sass-loader'),
            options: __assign(__assign({}, bud.options.get('sass')), { implementation: (function () {
                    try {
                        if (require.resolve('sass')) {
                            return require('sass');
                        }
                    }
                    catch (_a) {
                        return require('node-sass');
                    }
                })() })
        }); });
        this.bud.rules.set('sass', function (bud) { return ({
            test: /\.s(c|a)ss$/,
            exclude: bud.patterns.get('vendor'),
            use: __spreadArrays(bud.rules.get('css')(bud).use, [
                bud.uses.get('sass')(bud),
            ])
        }); });
        this.bud.apply('sass', function (options) {
            var _a;
            if (options) {
                this.options.set('sass', __assign(__assign({}, ((_a = this.options.get('sass')) !== null && _a !== void 0 ? _a : [])), options));
            }
        });
    }
}); };
exports.sass = sass;
//# sourceMappingURL=index.js.map