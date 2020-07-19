"use strict";
exports.__esModule = true;
exports.module = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var resolveUrl_1 = require("./../use/resolveUrl");
/**
 * CSS modules
 *
 * @return {object}
 */
var module = function (builder) { return ({
    builder: builder,
    output: {},
    test: patterns_1.patterns.cssModule,
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
    /**
     * Make CSS Modules object
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
            ])
        };
        this.post();
        return this.output;
    },
    /**
     * hook: pre_css_module
     */
    pre: function () {
        this.builder.bud.hooks.call('pre_css_module', this);
    },
    /**
     * hook: post_css_module
     */
    post: function () {
        this.builder.bud.hooks.call('pre_css_module', this.output);
    }
}); };
exports.module = module;
