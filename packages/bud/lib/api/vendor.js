"use strict";
exports.__esModule = true;
exports.vendor = void 0;
var vendor = function (options) {
    if (options === null || options === void 0 ? void 0 : options.hasOwnProperty('enabled')) {
        this.features.set('splitChunks', options.enabled);
        delete options.enabled;
    }
    else {
        this.features.enable('splitChunks');
    }
    options &&
        this.options.merge('webpack.optimization.splitChunks.cacheGroups.vendor', options);
    return this;
};
exports.vendor = vendor;
//# sourceMappingURL=vendor.js.map