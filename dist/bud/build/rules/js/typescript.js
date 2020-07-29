"use strict";
exports.__esModule = true;
exports.typescript = void 0;
var loaders_1 = require("../util/loaders");
var patterns_1 = require("../util/patterns");
var typescript = function (bud) { return ({
    bud: bud,
    rule: {},
    make: function () {
        this.pre();
        this.rule = {
            test: /\.tsx?$/,
            exclude: patterns_1.patterns.vendor,
            use: [
                {
                    loader: loaders_1.loaders.ts,
                    options: {
                        configFile: bud.configs.get('typescript')
                    }
                },
            ]
        };
        this.post();
        return this.rule;
    },
    /**
     * Hook: pre_typescript
     */
    pre: function () {
        this.bud.hooks.call('pre_typescript', this);
    },
    /**
     * Hook: post_typescript
     */
    post: function () {
        this.bud.hooks.call('post_typescript', this.rule);
    }
}); };
exports.typescript = typescript;
//# sourceMappingURL=typescript.js.map