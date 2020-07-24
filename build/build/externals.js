"use strict";
exports.__esModule = true;
exports.externals = void 0;
var externals = function (bud) { return ({
    bud: bud,
    options: {
        externals: bud.state.options.externals
    },
    make: function () {
        return this.options;
    }
}); };
exports.externals = externals;
//# sourceMappingURL=externals.js.map