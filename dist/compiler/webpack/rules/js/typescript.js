import { patterns } from '../util/patterns';
var typescript = function (bud) { return ({
    bud: bud,
    rule: {
        test: patterns.ts,
        exclude: patterns.vendor,
        use: [
            {
                loader: bud.loaders.get('ts'),
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
export { typescript };
//# sourceMappingURL=typescript.js.map