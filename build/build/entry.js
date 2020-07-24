"use strict";
exports.__esModule = true;
exports.entry = void 0;
/**
 * Entrypoints
 */
var entry = function (bud) { return ({
    bud: bud,
    options: {
        entry: bud.state.options.entry
    },
    make: function () {
        return this.options;
    }
}); };
exports.entry = entry;
//# sourceMappingURL=entry.js.map