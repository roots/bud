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
exports.entry = void 0;
/**
 * Entrypoints
 */
var entry = function (bud) { return ({
    bud: bud,
    options: {
        entry: __assign({}, bud.state.options.get('entry'))
    },
    make: function () {
        return this.bud.hooks.filter('filter_entry_final', this.options);
    }
}); };
exports.entry = entry;
//# sourceMappingURL=entry.js.map