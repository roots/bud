"use strict";
exports.__esModule = true;
exports.scss = void 0;
var scss = function (enabled) {
    this.features.set({
        scss: this.hooks.filter('filter_scss_enabled', enabled ? enabled : true)
    });
    return this;
};
exports.scss = scss;
//# sourceMappingURL=scss.js.map