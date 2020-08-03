"use strict";
exports.__esModule = true;
exports.font = void 0;
var patterns_1 = require("./util/patterns");
var useFile_1 = require("./use/useFile");
var font = function (bud) { return ({
    bud: bud,
    name: 'webpack.rules.font',
    rule: {
        test: patterns_1.patterns.font,
        use: []
    },
    make: function () {
        this.rule.use.push(useFile_1.useFile(this.name, bud));
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
exports.font = font;
//# sourceMappingURL=font.js.map