"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entry = void 0;
const bud_support_1 = require("@roots/bud-support");
const entry = function (bundle, assets) {
    this.store.merge('webpack.entry', bud_support_1.isString(assets) || bud_support_1.isArray(assets)
        ? {
            [`${bundle}`]: assets,
        }
        : assets);
    return this;
};
exports.entry = entry;
//# sourceMappingURL=entry.js.map