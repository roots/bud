"use strict";
exports.__esModule = true;
exports.font = void 0;
var font = function (bud) {
    return bud.hooks.filter('webpack.module.rules.font', {
        test: bud.hooks.filter('bud.module.rules.font.test', bud.patterns.get('font')),
        use: bud.hooks.filter('bud.module.rules.font.use', [
            bud.uses.get('file')(bud),
        ])
    });
};
exports.font = font;
//# sourceMappingURL=font.js.map