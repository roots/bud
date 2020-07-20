"use strict";
exports.__esModule = true;
exports.scss = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var resolveUrl_1 = require("../use/resolveUrl");
var implementation_1 = require("./implementation");
/**
 * scss
 * @typedef {function} scss
 * @return {object}
 */
var scss = function (builder) { return ({
    builder: builder,
    output: {},
    test: patterns_1.patterns.scss,
    miniCss: loaders_1.loaders.miniCss,
    css: loaders_1.loaders.css,
    resolveUrl: resolveUrl_1.resolveUrl(builder).make(),
    postCss: postCss(builder).make(),
    scss: {
        loader: loaders_1.loaders.scss,
        options: {
            sourceMap: true,
            implementation: implementation_1.implementation()
        }
    },
    /**
     * Make SCSS loaders object.
     */
    make: function () {
        this.pre();
        this.output = {
            test: this.test,
            use: Object.values([
                this.miniCss,
                this.css,
                this.resolveUrl,
                this.postCss,
                this.scss,
            ])
        };
        this.post();
        return this.output;
    },
    /**
     * hook: pre_scss
     */
    pre: function () {
        this.builder.bud.hooks.call('pre_scss', this);
    },
    /**
     * hook: post_scss
     */
    post: function () {
        this.builder.bud.hooks.call('post_scss', this.output);
    }
}); };
exports.scss = scss;
