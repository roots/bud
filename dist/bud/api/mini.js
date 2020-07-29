"use strict";
exports.__esModule = true;
exports.mini = void 0;
var mini = function (enable) {
    if (enable === void 0) { enable = true; }
    this.features.set({ minify: enable !== null && enable !== void 0 ? enable : true });
    return this;
};
exports.mini = mini;
//# sourceMappingURL=mini.js.map