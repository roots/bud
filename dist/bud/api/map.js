"use strict";
exports.__esModule = true;
exports.map = void 0;
var map = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.features.set({ sourceMap: enabled !== null && enabled !== void 0 ? enabled : true });
    return this;
};
exports.map = map;
//# sourceMappingURL=map.js.map