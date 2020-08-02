"use strict";
exports.__esModule = true;
exports.entry = void 0;
var entry = function (bud) { return ({
    bud: bud,
    make: function () {
        !this.bud.options.has('entry')
            && this.bud.glob("*/*.(js|css|scss|vue|ts|tsx)");
        return {
            entry: this.bud.hooks.filter('filter_entry_final', this.bud.options.get('entry'))
        };
    }
}); };
exports.entry = entry;
//# sourceMappingURL=entry.js.map