"use strict";
exports.__esModule = true;
exports.externals = void 0;
var externals = function (bud) {
    return bud.hooks.filter('webpack.externals', {
        externals: bud.options.get('webpack.externals')
    });
};
exports.externals = externals;
//# sourceMappingURL=externals.js.map