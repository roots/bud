"use strict";
exports.__esModule = true;
exports.watch = void 0;
var watch = function (options) {
    this.features.set({
        watch: options.hasOwnProperty('enabled') ? options.enabled : true
    });
    (options === null || options === void 0 ? void 0 : options.paths) && this.options.set('watch', options.paths);
    return this;
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map