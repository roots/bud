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
exports.css = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var postCss_1 = require("../use/postCss");
var resolveUrl_1 = require("../use/resolveUrl");
var css = function (bud) { return ({
    bud: bud,
    use: [],
    test: patterns_1.patterns.css,
    sourceMap: bud.features.enabled('map'),
    make: function () {
        if (this.bud.features.enabled('vue')) {
            this.use.push('vue-style-loader');
        }
        this.use = __spreadArrays(this.use, [
            loaders_1.loaders.miniCss(this.bud.features.enabled('hot')),
            loaders_1.loaders.css,
            resolveUrl_1.resolveUrl(this.bud).make(),
        ]);
        if (this.bud.features.enabled('postCss')) {
            this.use.push(__assign({}, postCss_1.postCss(this.bud).make()));
        }
        this.bud.hooks.call('pre_css', this);
        this.output = {
            test: this.test,
            use: this.use
        };
        this.bud.hooks.call('post_css', {
            output: this.output
        });
        return this.output;
    }
}); };
exports.css = css;
//# sourceMappingURL=css.js.map