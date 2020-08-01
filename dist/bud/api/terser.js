"use strict";
exports.__esModule = true;
exports.terser = void 0;
var terser = function (options) {
    var _a;
    this.features.set('terser', (_a = options === null || options === void 0 ? void 0 : options.enable) !== null && _a !== void 0 ? _a : true);
    (options === null || options === void 0 ? void 0 : options.terser) && this.options.set('terser', options.terser);
    return this;
};
exports.terser = terser;
//# sourceMappingURL=terser.js.map