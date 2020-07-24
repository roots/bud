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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.postCss = void 0;
/**
 * ## bud.postCss
 *
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * ```js
 * bud.postCss({
 *   plugins: [
 *    require('astroturf'),
 *   ],
 * })
 * ```
 */
var postCss = function (_a) {
    var _b = _a.enabled, enabled = _b === void 0 ? true : _b, options = __rest(_a, ["enabled"]);
    this.state.features.postCss = enabled;
    if (this.state.features.postCss) {
        this.state.options.postCss = __assign(__assign({}, this.state.options.postCss), options);
    }
    return this;
};
exports.postCss = postCss;
//# sourceMappingURL=postcss.js.map