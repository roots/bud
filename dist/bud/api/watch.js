"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.watch = void 0;
var watch = function (options) {
    this.logger.info(__assign({ name: 'bud.api', "function": 'bud.watch' }, options), "bud.watch called");
    (options === null || options === void 0 ? void 0 : options.enabled) && this.features.enable('watch');
    (options === null || options === void 0 ? void 0 : options.paths) &&
        this.options.set('watch', this.hooks.filter('api.watch.filter', options.paths));
    return this;
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map