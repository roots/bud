"use strict";
exports.__esModule = true;
exports.bundle = void 0;
var bundle = function (name, entries) {
    var _a;
    this.options.merge('entry', (_a = {}, _a["" + name] = entries, _a));
    return this;
};
exports.bundle = bundle;
//# sourceMappingURL=bundle.js.map