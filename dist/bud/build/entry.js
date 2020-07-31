"use strict";
exports.__esModule = true;
exports.entry = void 0;
/**
 * Entrypoints
 */
var entry = function (bud) { return ({
    bud: bud,
    options: {},
    make: function () {
        if (this.bud.options.get('entry') == null) {
            this.bud.glob("*/*.(js|css|scss|vue|ts|tsx)");
        }
        this.options.entry = this.bud.options.get('entry');
        return this.bud.hooks.filter('filter_entry_final', this.options);
    }
}); };
exports.entry = entry;
//# sourceMappingURL=entry.js.map