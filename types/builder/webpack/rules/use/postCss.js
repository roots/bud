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
exports.postCss = void 0;
var loaders_1 = require("../util/loaders");
/**
 * PostCSS
 * @typedef {function} postCss
 * @return {object}
 */
var postCss = function (builder) { return ({
    builder: builder,
    config: {
        loader: loaders_1.loaders.postCss,
        options: __assign({ ident: 'postcss', parser: 'postcss-scss' }, builder.bud.options.postCss)
    },
    output: {},
    make: function () {
        this.builder.bud.hooks.call('pre_postcss', this);
        this.output = this.builder.bud.features.postCss
            ? this.config
            : {};
        this.builder.bud.hooks.call('post_postcss', this.output);
        return this.output;
    }
}); };
exports.postCss = postCss;
