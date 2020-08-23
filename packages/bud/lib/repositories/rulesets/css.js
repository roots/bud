"use strict";
exports.__esModule = true;
exports.css = void 0;
var css = function (bud) {
    return bud.hooks.filter('webpack.module.rules.css', {
        test: bud.hooks.filter('webpack.module.rules.css.test', bud.patterns.get('css')),
        exclude: bud.hooks.filter('webpack.module.rules.css.exclude', bud.patterns.get('vendor')),
        use: bud.hooks.filter('webpack.module.rules.css.use', [
            bud.uses.get('miniCss')(bud),
            bud.uses.get('css')(bud),
            bud.uses.get('resolveUrl')(bud),
            bud.uses.get('postCss')(bud),
        ])
    });
};
exports.css = css;
//# sourceMappingURL=css.js.map