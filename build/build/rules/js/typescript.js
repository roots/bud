"use strict";
exports.__esModule = true;
exports.typescript = void 0;
var loaders_1 = require("../util/loaders");
/**
 * Typescript
 * @type {function}
 */
var typescript = function (bud) { return ({
    bud: bud,
    output: {},
    enabled: bud.state.configs.typescript,
    loader: loaders_1.loaders.ts,
    options: {
        configFile: bud.state.configs.typescript
    },
    /**
     * Make typescript rules.
     */
    make: function () {
        this.pre();
        this.output = this.enabled
            ? {
                loader: this.loader,
                options: this.options
            }
            : null;
        this.post();
        return this.output;
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
        this.bud.hooks.call('post_typescript', this.output);
    }
}); };
exports.typescript = typescript;
//# sourceMappingURL=typescript.js.map