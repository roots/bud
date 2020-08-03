"use strict";
exports.__esModule = true;
exports.typescript = void 0;
var patterns_1 = require("../util/patterns");
var typescript = function (bud) { return ({
    bud: bud,
    rule: {
        test: patterns_1.patterns.ts,
        exclude: patterns_1.patterns.vendor,
        use: [
            {
                loader: bud.loaders.ts,
                options: {
                    configFile: bud.configs.get('typescript')
                }
            },
        ]
    },
    make: function () {
        this.bud.hooks.call('webpack.rules.babel.post');
        this.rule = this.bud.hooks.filter('webpack.rules.typescript', this.rule);
        this.bud.logger.info({
            name: 'webpack.rules',
            value: this.rule.test
        }, "webpack.rules.typescript.test");
        this.bud.logger.info({
            name: 'webpack.rules',
            value: this.rule.exclude
        }, "webpack.rules.typescript.exclude");
        this.bud.logger.info({
            name: 'webpack.rules',
            value: this.rule.use.map(function (item) { return item.loader; })
        }, "webpack.rules.typescript.use");
        this.bud.hooks.call('webpack.rules.babel.post');
        return this.rule;
    }
}); };
exports.typescript = typescript;
//# sourceMappingURL=typescript.js.map