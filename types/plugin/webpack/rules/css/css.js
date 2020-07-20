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
exports.__esModule = true;
exports.css = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var resolveUrl_1 = require("../use/resolveUrl");
/**
 * Css
 * @return {object}
 */
var css = function (builder) { return ({
    builder: builder,
    test: patterns_1.patterns.css,
    sourceMap: builder.bud.features.map,
    make: function () {
        this.use = [
            loaders_1.loaders.miniCss,
            loaders_1.loaders.css,
            resolveUrl_1.resolveUrl(this.builder).make(),
            __assign({}, postCss(this.builder).make()),
        ];
        this.builder.bud.hooks.call('pre_css', this);
        this.output = {
            test: this.test,
            use: this.use
        };
        this.builder.bud.hooks.call('post_css', {
            output: this.output
        });
        return this.output;
    }
}); };
exports.css = css;
