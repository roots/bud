"use strict";
exports.__esModule = true;
exports.scss = void 0;
var patterns_1 = require("../util/patterns");
var usePostCss_1 = require("../use/usePostCss");
var useResolveUrl_1 = require("../use/useResolveUrl");
var useVueStyle_1 = require("../use/useVueStyle");
var useCss_1 = require("../use/useCss");
var useScss_1 = require("../use/useScss");
var useMiniCss_1 = require("../use/useMiniCss");
/**
 * scss
 */
var scss = function (bud) { return ({
    bud: bud,
    isHot: bud.features.enabled('hot'),
    isPostCss: bud.features.enabled('postCss'),
    rule: {
        test: patterns_1.patterns.scss,
        use: [],
        sourceMap: bud.features.enabled('map')
    },
    make: function () {
        this.bud.hooks.call('webpack.rules.scss.pre');
        if (this.bud.features.enabled('vue')) {
            this.rule.use.push(useVueStyle_1.useVueStyle('scss', this.bud));
        }
        this.rule.use.push(useMiniCss_1.useMiniCss('scss', this.bud));
        this.rule.use.push(useCss_1.useCss('scss', this.bud));
        this.rule.use.push(useResolveUrl_1.useResolveUrl('scss', this.bud));
        if (this.isPostCss) {
            this.rule.use.push(usePostCss_1.usePostCss('scss', this.bud));
        }
        this.rule.use.push(useScss_1.useScss('module.scss', this.bud));
        this.rule = this.bud.hooks.filter('webpack.rules.scss', this.rule);
        this.bud.logger.info({ name: 'webpack.rules.scss', value: this.rule.test.toString() }, "webpack.rules.scss.test");
        this.bud.hooks.call('webpack.rules.scss.post');
        return this.rule;
    }
}); };
exports.scss = scss;
//# sourceMappingURL=scss.js.map