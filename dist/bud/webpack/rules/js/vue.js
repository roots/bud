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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.vue = void 0;
var patterns_1 = require("../util/patterns");
var vue_template_compiler_1 = __importDefault(require("vue-template-compiler"));
var vue = function (bud) { return ({
    bud: bud,
    make: function () {
        this.pre();
        this.rule = {
            test: patterns_1.patterns.vue,
            exclude: patterns_1.patterns.vendor,
            use: [
                {
                    loader: bud.loaders.vue,
                    options: __assign({ compiler: vue_template_compiler_1["default"], productionMode: this.bud.inProduction, cacheDirectory: this.bud.dist('cache/vue'), optimizeSSR: false }, this.bud.options.get('vue'))
                },
            ]
        };
        this.post();
        return this.rule;
    },
    /**
     * Hook: pre_vue
     */
    pre: function () {
        this.bud.hooks.call('pre_vue', this);
    },
    /**
     * Hook: post_vue
     */
    post: function () {
        this.bud.hooks.call('post_vue', this.rule);
        this.bud.logger.info({ name: 'webpack.rules', value: this.rule.test.toString() }, "vue test");
        this.bud.logger.info({ name: 'webpack.rules', value: this.rule.exclude.toString() }, "vue exclude");
        this.bud.logger.info({
            name: 'webpack.rules',
            value: this.rule.use.map(function (item) { return item.loader; })
        }, "vue use");
    }
}); };
exports.vue = vue;
//# sourceMappingURL=vue.js.map