"use strict";
exports.__esModule = true;
exports.module = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var resolveUrl_1 = require("./../use/resolveUrl");
var implementation_1 = require("./implementation");
/**
 * SCSS modules
 * @typedef {function} cssModule
 * @return {object}
 */
var module = function (builder) { return ({
    builder: builder,
    output: {},
    test: patterns_1.patterns.scssModule,
    miniCss: loaders_1.loaders.miniCss,
    css: {
        loader: loaders_1.loaders.css,
        options: {
            modules: true,
            onlyLocals: false
        }
    },
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
     * hook: pre_scss_module
     */
    pre: function () {
        this.builder.bud.hooks.call('pre_scss_module', this);
    },
    /**
     * hook: post_scss_module
     */
    post: function () {
        this.builder.bud.hooks.call('post_scss_module', this.output);
    }
}); };
exports.module = module;
