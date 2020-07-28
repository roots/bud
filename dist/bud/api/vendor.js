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
    this.state.features.vendor = true;
    this.state.options.vendor.name = name !== null && name !== void 0 ? name : 'vendor';
    return this;
};
exports.vendor = vendor;
//# sourceMappingURL=vendor.js.map