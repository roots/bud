"use strict";
exports.__esModule = true;
exports.debug = void 0;
var debug = function (enabled) {
    this.features.set({ debug: enabled !== null && enabled !== void 0 ? enabled : true });
    return this;
};
exports.debug = debug;
//# sourceMappingURL=debug.js.map