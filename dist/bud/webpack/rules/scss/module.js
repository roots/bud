"use strict";
exports.__esModule = true;
exports.module = void 0;
var patterns_1 = require("../util/patterns");
var usePostCss_1 = require("../use/usePostCss");
var useResolveUrl_1 = require("../use/useResolveUrl");
var useVueStyle_1 = require("../use/useVueStyle");
var useCss_1 = require("../use/useCss");
var useScss_1 = require("../use/useScss");
var useMiniCss_1 = require("../use/useMiniCss");
var module = function (bud) { return ({
    bud: bud,
    isHot: bud.features.enabled('hot'),
    isPostCss: bud.features.enabled('postCss'),
    rule: {
        test: patterns_1.patterns.scssModule,
        use: [],
        sourceMap: bud.features.enabled('map')
    },
    make: function () {
        this.bud.hooks.call('webpack.rules.module.scss.pre');
        if (this.bud.features.enabled('vue')) {
            this.rule.use.push(useVueStyle_1.useVueStyle('webpack.rules.module.scss', this.bud));
        }
        this.rule.use.push(useMiniCss_1.useMiniCss('webpack.rules.module.scss', this.bud));
        this.rule.use.push(useCss_1.useCss('webpack.rules.module.scss', this.bud, true));
        this.rule.use.push(useResolveUrl_1.useResolveUrl('webpack.rules.module.scss', this.bud));
        if (this.isPostCss) {
            this.rule.use.push(usePostCss_1.usePostCss('webpack.rules.module.scss', this.bud));
        }
        this.rule.use.push(useScss_1.useScss('webpack.rules.module.scss', this.bud));
        this.rule = this.bud.hooks.filter('webpack.rules.module.scss', this.rule);
        this.bud.logger.info({ name: 'webpack.rules.module.scss', value: this.rule.test.toString() }, "webpack.rules.module.scss.test");
        this.bud.hooks.call('webpack.rules.module.scss.post');
        return this.rule;
    }
}); };
exports.module = module;
//# sourceMappingURL=module.js.map