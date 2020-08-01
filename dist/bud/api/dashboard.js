"use strict";
exports.__esModule = true;
exports.dashboard = void 0;
var dashboard = function (enabled) {
    enabled === false
        ? this.features.disable('dashboard')
        : this.features.enable('dashboard');
    return this;
};
exports.dashboard = dashboard;
//# sourceMappingURL=dashboard.js.map