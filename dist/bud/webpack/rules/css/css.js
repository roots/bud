"use strict";
exports.__esModule = true;
exports.css = void 0;
var patterns_1 = require("../util/patterns");
var usePostCss_1 = require("../use/usePostCss");
var useResolveUrl_1 = require("../use/useResolveUrl");
var useVueStyle_1 = require("../use/useVueStyle");
var useCss_1 = require("../use/useCss");
var useMiniCss_1 = require("../use/useMiniCss");
var css = function (bud) { return ({
    bud: bud,
    isHot: bud.features.enabled('hot'),
    rule: {
        test: patterns_1.patterns.css,
        use: [],
        sourceMap: bud.features.enabled('map')
    },
    make: function () {
        this.bud.hooks.call('webpack.rules.css.pre');
        if (this.bud.features.enabled('vue')) {
            this.rule.use.push(useVueStyle_1.useVueStyle('css', this.bud));
        }
        this.rule.use.push(useMiniCss_1.useMiniCss('css', this.bud));
        this.rule.use.push(useCss_1.useCss('css', this.bud));
        this.rule.use.push(useResolveUrl_1.useResolveUrl('css', this.bud));
        if (this.bud.features.enabled('postCss')) {
            this.rule.use.push(usePostCss_1.usePostCss('css', this.bud));
        }
        this.rule = this.bud.hooks.filter('webpack.rules.css', this.rule);
        this.bud.logger.info({ name: 'webpack.rules.css', value: this.rule.test.toString() }, "webpack.rules.css.test");
        this.bud.hooks.call('webpack.rules.css.post');
        return this.rule;
    }
}); };
exports.css = css;
//# sourceMappingURL=css.js.map