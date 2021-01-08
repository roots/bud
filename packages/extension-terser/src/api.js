"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terser = void 0;
const terser = function (options) {
    const terserOptions = this.extensions
        .get('terser')
        .getOptions();
    Object.entries(options).map(([opt, val]) => {
        terserOptions.merge(opt, val);
    });
    return this;
};
exports.terser = terser;
//# sourceMappingURL=api.js.map