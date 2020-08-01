"use strict";
exports.__esModule = true;
exports.module = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var postCss_1 = require("../use/postCss");
var resolveUrl_1 = require("../use/resolveUrl");
/**
 * CSS modules
 * @param {Bud} bud
 * @return {object}
 */
var module = function (bud) { return ({
    bud: bud,
    rule: {
        test: patterns_1.patterns.cssModule,
        use: [
            loaders_1.loaders.miniCss(bud.features.enabled('hot')),
            {
                loader: loaders_1.loaders.css,
                options: {
                    modules: true,
                    onlyLocals: false
                }
            },
            resolveUrl_1.resolveUrl(bud).make(),
        ]
    },
    /**
     * Make CSS Modules object
     */
    make: function () {
        this.pre();
        if (this.bud.features.enabled('postCss')) {
            this.use.push(postCss_1.postCss(this.bud).make());
        }
        this.post();
        return this.rule;
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