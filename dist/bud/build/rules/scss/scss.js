"use strict";
exports.__esModule = true;
exports.scss = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var postCss_1 = require("../use/postCss");
var resolveUrl_1 = require("../use/resolveUrl");
var implementation_1 = require("./implementation");
/**
 * scss
 */
var scss = function (bud) { return ({
    bud: bud,
    output: {},
    test: patterns_1.patterns.scss,
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
                loaders_1.loaders.miniCss(this.bud.featureEnabled('hot')),
                loaders_1.loaders.css,
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
        this.bud.hooks.call('pre_scss', this);
    },
    /**
     * hook: post_scss
     */
    post: function () {
        this.bud.hooks.call('post_scss', this.output);
    }
}); };
exports.scss = scss;
//# sourceMappingURL=scss.js.map