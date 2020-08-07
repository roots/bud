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
import { patterns } from './util/patterns';
import { useFile } from './use/useFile';
var font = function (bud) { return ({
    bud: bud,
    name: 'webpack.rules.font',
    rule: {
        test: patterns.font,
        use: [__assign({}, useFile('webpack.rules.font', bud))]
    },
    make: function () {
        this.rule.use = this.bud.hooks.filter(this.name + ".use", this.rule.use);
        this.rule.test = this.bud.hooks.filter(this.name + ".test", this.rule.test);
        this.rule = this.bud.hooks.filter(this.name + ".filter", this.rule);
        this.bud.logger.info({
            name: this.name,
            value: this.rule.test.toString()
        }, "test");
        this.bud.logger.info({
            name: this.name,
            value: this.rule.use.map(function (item) { return item.loader; })
        }, "use");
        return this.rule;
    }
}); };
export { font };
//# sourceMappingURL=font.js.map