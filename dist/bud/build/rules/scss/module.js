"use strict";
exports.__esModule = true;
exports.module = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var postCss_1 = require("../use/postCss");
var resolveUrl_1 = require("../use/resolveUrl");
var implementation_1 = require("./implementation");
/**
 * SCSS modules
 * @typedef {function} cssModule
 * @return {object}
 */
var module = function (bud) { return ({
    bud: bud,
    output: {},
    test: patterns_1.patterns.scssModule,
    css: {
        loader: loaders_1.loaders.css,
        options: {
            modules: true,
            onlyLocals: false
        }
    },
    resolveUrl: resolveUrl_1.resolveUrl(bud).make(),
    postCss: postCss_1.postCss(bud).make(),
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
                loaders_1.loaders.miniCss(this.bud.features.enabled('hot')),
                ,
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
        this.bud.hooks.call('pre_scss_module', this);
    },
    /**
     * hook: post_scss_module
     */
    post: function () {
        this.bud.hooks.call('post_scss_module', this.output);
    }
}); };
exports.module = module;
//# sourceMappingURL=module.js.map