"use strict";
exports.__esModule = true;
exports.featureEnabled = void 0;
/**
 * ## bud.featureEnabled
 *
 * Return a boolean representing if a feature is enabled.
 *
 * ```js
 * bud.featureEnabled('eslint')
 * // returns true if eslint enabled
 * ```
 */
var featureEnabled = function (feature) {
    return this.state.features[feature] ? true : false;
};
exports.featureEnabled = featureEnabled;
//# sourceMappingURL=featureEnabled.js.map