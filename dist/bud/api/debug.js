"use strict";
exports.__esModule = true;
exports.debug = void 0;
var debug = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    !enabled ? this.features.disable('debug') : this.features.enable('debug');
    return this;
};
exports.debug = debug;
//# sourceMappingURL=debug.js.map