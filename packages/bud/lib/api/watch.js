"use strict";
exports.__esModule = true;
exports.watch = void 0;
var watch = function (options) {
    (options === null || options === void 0 ? void 0 : options.enabled) && this.features.enable('watch');
    (options === null || options === void 0 ? void 0 : options.paths) &&
        this.options.set('watch', this.hooks.filter('api.watch', options.paths));
    return this;
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map