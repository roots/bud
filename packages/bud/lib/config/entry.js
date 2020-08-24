"use strict";
exports.__esModule = true;
exports.entry = void 0;
var entry = function (bud) {
    return bud.hooks.filter('webpack.entry', {
        entry: bud.options.get('webpack.entry')
    });
};
exports.entry = entry;
//# sourceMappingURL=entry.js.map