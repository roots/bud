"use strict";
exports.__esModule = true;
exports.watch = void 0;
var watch = function (options) {
    var _a;
    this.features.set({
        watch: options.hasOwnProperty('enabled') ? options.enabled : false
    });
    this.state.options.watch = (_a = options.paths) !== null && _a !== void 0 ? _a : [];
    return this;
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map