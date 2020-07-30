"use strict";
exports.__esModule = true;
exports.vue = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var vue = function (bud) { return ({
    bud: bud,
    /**
     * Make vue rules
     */
    make: function () {
        this.pre();
        this.rule = {
            test: patterns_1.patterns.vue,
            exclude: patterns_1.patterns.vendor,
            use: [
                {
                    loader: loaders_1.loaders.vue
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
    }
}); };
exports.vue = vue;
//# sourceMappingURL=vue.js.map