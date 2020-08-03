"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    name: 'webpack.rules.css',
    rule: {
        test: patterns_1.patterns.css,
        use: []
    },
    make: function () {
        this.bud.hooks.call('webpack.rules.css.pre');
        if (this.bud.features.enabled('vue')) {
            this.rule.use.push(__assign({}, useVueStyle_1.useVueStyle(this.name, this.bud)));
        }
        this.rule.use.push(useMiniCss_1.useMiniCss(this.name, this.bud));
        this.rule.use.push(useCss_1.useCss(this.name, this.bud));
        this.rule.use.push(useResolveUrl_1.useResolveUrl(this.name, this.bud));
        if (this.bud.features.enabled('postCss')) {
            this.rule.use.push(usePostCss_1.usePostCss(this.name, this.bud));
        }
        this.rule = this.bud.hooks.filter(this.name, this.rule);
        this.bud.logger.info({ name: this.name, value: this.rule.test.toString() }, "webpack.rules.css.test");
        this.bud.hooks.call('webpack.rules.css.post');
        return this.rule;
    }
}); };
exports.css = css;
//# sourceMappingURL=css.js.map