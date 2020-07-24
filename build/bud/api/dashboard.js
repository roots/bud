"use strict";
exports.__esModule = true;
exports.dashboard = void 0;
/**
 * ## bud.dashboard
 *
 * Enable or disable Bud's CLI build output.
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 */
var dashboard = function (enabled) {
    this.state.features.dashboard = enabled;
    return this;
};
exports.dashboard = dashboard;
//# sourceMappingURL=dashboard.js.map