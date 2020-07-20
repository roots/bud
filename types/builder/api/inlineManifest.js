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
 * Inline commons scripts.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
var inlineManifest = function (options) {
    this.features.inlineManifest = true;
    if (this.features.inlineManifest) {
        this.options.inlineManifest = __assign(__assign({}, this.options.inlineManifest), { name: (options === null || options === void 0 ? void 0 : options.name) || 'runtime' });
    }
    return this;
};
exports.inlineManifest = inlineManifest;
