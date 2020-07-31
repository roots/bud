"use strict";
exports.__esModule = true;
exports.dump = void 0;
var dump = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.features.set('dump', enabled);
    return this;
};
exports.dump = dump;
//# sourceMappingURL=dump.js.map