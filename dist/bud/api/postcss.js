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
var postCss = function (_a) {
    var enabled = _a.enabled, options = __rest(_a, ["enabled"]);
    this.logger.info({ name: 'bud.api', "function": 'bud.postcss', enabled: enabled, options: options }, "bud.postcss called");
    var postCssEnabled = enabled ? enabled : true;
    postCssEnabled && this.features.enable('postCss');
    if (this.features.enabled('postCss')) {
        this.options.set('postcss', __assign(__assign({}, this.options.get('postCss')), options));
    }
    return this;
};
exports.postCss = postCss;
//# sourceMappingURL=postcss.js.map