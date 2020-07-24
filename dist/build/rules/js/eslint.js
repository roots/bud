"use strict";
exports.__esModule = true;
exports.eslint = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var eslint = function (bud) {
    var _a, _b, _c;
    return ({
        bud: bud,
        enabled: (_a = bud === null || bud === void 0 ? void 0 : bud.state) === null || _a === void 0 ? void 0 : _a.configs.eslint,
        enforce: 'pre',
        test: patterns_1.patterns.js,
        include: (_b = bud === null || bud === void 0 ? void 0 : bud.state) === null || _b === void 0 ? void 0 : _b.paths.src,
        exclude: patterns_1.patterns.vendor,
        loader: loaders_1.loaders.eslint,
        options: {
            configFile: (_c = bud === null || bud === void 0 ? void 0 : bud.state) === null || _c === void 0 ? void 0 : _c.configs.eslint,
            formatter: 'codeframe',
            failOnError: true
        },
        output: {},
        make: function () {
            this.pre();
            this.output = this.enabled
                ? {
                    enforce: this.enforce,
                    test: this.test,
                    include: this.include,
                    exclude: this.exclude,
                    loader: this.loader,
                    options: this.options
                }
                : {};
            this.post();
            return this.output;
        },
        pre: function () {
            this.bud.hooks.call('pre_eslint', this);
        },
        post: function () {
            this.bud.hooks.call('post_eslint', this.output);
        }
    });
};
exports.eslint = eslint;
//# sourceMappingURL=eslint.js.map