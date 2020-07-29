"use strict";
exports.__esModule = true;
exports.vendor = void 0;
var vendor = function (name) {
    this.features.enable('vendor');
    this.options.merge('vendor', { name: name !== null && name !== void 0 ? name : 'vendor' });
    return this;
};
exports.vendor = vendor;
//# sourceMappingURL=vendor.js.map