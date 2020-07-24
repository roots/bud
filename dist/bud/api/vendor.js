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
    var _a, _b, _c, _d;
    if (name === void 0) { name = 'vendor'; }
    if ((_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.vendor) {
        this.state.features.vendor = true;
    }
    if ((_d = (_c = this.state) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.vendor) {
        this.state.options.vendor.name = name;
    }
    return this;
};
exports.vendor = vendor;
//# sourceMappingURL=vendor.js.map