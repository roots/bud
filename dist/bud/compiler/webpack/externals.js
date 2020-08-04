"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.externals = void 0;
var externals = function (bud) { return ({
    bud: bud,
    target: {
        externals: false
    },
    make: function () {
        var _a;
        this.target.externals = this.bud.options.has('externals')
            ? this.bud.hooks.filter('webpack_externals', this.bud.options.get('externals'))
            : this.bud.hooks.filter('webpack_externals_fallback', false);
        /**
         * Don't include modules when target is node.
         */
        return !this.bud.options.is('target', 'node')
            ? (_a = this.target.externals) !== null && _a !== void 0 ? _a : null : __spreadArrays(this.bud.services.nodeExternals(), this.target.externals);
    }
}); };
exports.externals = externals;
//# sourceMappingURL=externals.js.map