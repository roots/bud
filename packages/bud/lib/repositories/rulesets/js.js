"use strict";
exports.__esModule = true;
exports.js = void 0;
var js = function (bud) {
    return bud.hooks.filter('webpack.module.rules.js', {
        test: bud.hooks.filter('webpack.module.rules.js.test', bud.patterns.get('js')),
        exclude: bud.hooks.filter('webpack.module.rules.js.exclude', bud.patterns.get('vendor')),
        use: bud.hooks.filter('webpack.module.rules.js.use', {
            value: [bud.uses.get('babel')(bud)],
            bud: bud
        }).value
    });
};
exports.js = js;
//# sourceMappingURL=js.js.map