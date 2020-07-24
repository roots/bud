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
exports.inlineManifest = void 0;
/**
 * Inline common scripts.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
var inlineManifest = function (name) {
    this.state.features.inlineManifest = true;
    if (this.state.features.inlineManifest) {
        this.state.options.inlineManifest = __assign(__assign({}, this.state.options.inlineManifest), { name: name || 'runtime' });
    }
    return this;
};
exports.inlineManifest = inlineManifest;
//# sourceMappingURL=inlineManifest.js.map