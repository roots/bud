"use strict";
exports.__esModule = true;
exports.externals = void 0;
var externals = function (bud) { return ({
    bud: bud,
    options: {},
    make: function () {
        if (this.bud.state.options.externals) {
            this.options.externals = this.bud.state.options.externals;
        }
        return this.options;
    }
}); };
exports.externals = externals;
//# sourceMappingURL=externals.js.map