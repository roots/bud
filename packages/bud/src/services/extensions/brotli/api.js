"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brotli = void 0;
const brotli = function (options) {
    this.store.set('features.brotli', true);
    if (!options)
        return;
    this.extensions.set('compression-webpack-plugin-brotli.options', options);
    return this;
};
exports.brotli = brotli;
//# sourceMappingURL=api.js.map