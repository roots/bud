"use strict";
exports.__esModule = true;
exports.module = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var postCss_1 = require("../use/postCss");
var resolveUrl_1 = require("../use/resolveUrl");
/**
 * CSS modules
 *
 * @return {object}
 */
var module = function (bud) { return ({
    bud: bud,
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
    resolveUrl: resolveUrl_1.resolveUrl(bud).make(),
    postCss: postCss_1.postCss(bud).make(),
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
        this.bud.hooks.call('pre_css_module', this);
    },
    /**
     * hook: post_css_module
     */
    post: function () {
        this.bud.hooks.call('pre_css_module', this.output);
    }
}); };
exports.module = module;
//# sourceMappingURL=module.js.map