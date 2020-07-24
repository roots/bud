"use strict";
exports.__esModule = true;
exports.vendor = void 0;
/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 */
var vendor = function (name) {
    if (name === void 0) { name = 'vendor'; }
    this.state.features.vendor = true;
    this.state.options.vendor.name = name;
    return this;
};
exports.vendor = vendor;
//# sourceMappingURL=vendor.js.map