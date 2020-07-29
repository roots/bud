"use strict";
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
var postCss = function (_a) {
    var _b = _a.enabled, enabled = _b === void 0 ? true : _b, options = __rest(_a, ["enabled"]);
    this.features.set({ postCss: enabled !== null && enabled !== void 0 ? enabled : true });
    if (this.features.enabled('postCss')) {
        this.options.merge('postcss', options);
    }
    return this;
};
exports.postCss = postCss;
//# sourceMappingURL=postcss.js.map