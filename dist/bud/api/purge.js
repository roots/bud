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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.purge = void 0;
var purge = function (_a) {
    var _b = _a.enabled, enabled = _b === void 0 ? true : _b, options = __rest(_a, ["enabled"]);
    var purgeEnabled = enabled !== null && enabled !== void 0 ? enabled : true;
    purgeEnabled && this.features.enable('purge');
    if (!this.features.enabled('purge')) {
        this.logger.info({ name: 'api' }, 'bud.purge called but it is not enabled on this build');
        return this;
    }
    var value = {
        plugins: __spreadArrays(this.options.get('postCss').plugins, [
            require('@fullhuman/postcss-purgecss')(options),
        ])
    };
    this.options.set('postCss', value);
    this.logger.info({ name: 'api', value: value }, 'bud.purge called');
    return this;
};
exports.purge = purge;
//# sourceMappingURL=purge.js.map