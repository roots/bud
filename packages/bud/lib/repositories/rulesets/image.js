"use strict";
exports.__esModule = true;
exports.image = void 0;
var image = function (bud) {
    return bud.hooks.filter('webpack.module.rules.image', {
        test: bud.hooks.filter('webpack.module.rules.image.test', bud.patterns.get('image')),
        use: bud.hooks.filter('webpack.module.rules.image.use', [
            bud.uses.get('file')(bud),
        ])
    });
};
exports.image = image;
//# sourceMappingURL=image.js.map