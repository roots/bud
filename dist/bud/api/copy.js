"use strict";
exports.__esModule = true;
exports.copy = void 0;
var copy = function (from, to) {
    this.state.options.copy.patterns.push({ from: from, to: to });
    return this;
};
exports.copy = copy;
//# sourceMappingURL=copy.js.map