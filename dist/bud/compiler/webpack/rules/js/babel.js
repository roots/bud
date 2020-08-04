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
exports.babel = void 0;
var patterns_1 = require("../util/patterns");
var babel = function (bud) { return ({
    bud: bud,
    rule: {
        test: patterns_1.patterns.js,
        exclude: patterns_1.patterns.vendor,
        use: [
            {
                loader: bud.loaders.get('babel'),
                options: __assign(__assign({}, bud.options.get('babel')), { cacheDirectory: true, cacheCompression: bud.inProduction })
            },
        ]
    },
    make: function () {
        this.bud.hooks.call('webpack.rules.babel.pre');
        this.rule = this.bud.hooks.filter('webpack.rules.babel', this.rule);
        this.bud.hooks.call('webpack.rules.babel.post');
        this.bud.logger.info({
            name: 'webpack.rules',
            value: this.rule.test
        }, "webpack.rules.babel.test");
        this.bud.logger.info({
            name: 'webpack.rules',
            value: this.rule.exclude
        }, "webpack.rules.babel.exclude");
        this.bud.logger.info({
            name: 'webpack.rules',
            value: this.rule.use.map(function (item) { return item.loader; })
        }, "webpack.rules.babel.use");
        return this.rule;
    }
}); };
exports.babel = babel;
//# sourceMappingURL=babel.js.map