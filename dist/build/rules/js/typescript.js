"use strict";
exports.__esModule = true;
exports.typescript = void 0;
var loaders_1 = require("../util/loaders");
var typescript = function (bud) {
    var _a, _b;
    return ({
        bud: bud,
        enabled: (_a = bud === null || bud === void 0 ? void 0 : bud.state) === null || _a === void 0 ? void 0 : _a.configs.typescript,
        loader: loaders_1.loaders.ts,
        options: {
            configFile: (_b = bud === null || bud === void 0 ? void 0 : bud.state) === null || _b === void 0 ? void 0 : _b.configs.typescript
        },
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
    });
};
exports.typescript = typescript;
//# sourceMappingURL=typescript.js.map