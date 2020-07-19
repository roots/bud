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
 *
 * @param   {string} name - name of vendor output file
 * @return  {bud: typeof import('./../index')} bud
 */
var vendor = function (name) {
    if (name === void 0) { name = 'vendor'; }
    this.features.vendor = true;
    this.options.vendor.name = name;
    return this;
};
exports.vendor = vendor;
