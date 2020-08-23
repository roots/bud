"use strict";
exports.__esModule = true;
exports.svg = void 0;
var svg = function (bud) {
    return bud.hooks.filter('webpack.module.rules.svg', {
        test: bud.hooks.filter('webpack.module.rules.svg.test', bud.patterns.get('svg')),
        use: bud.hooks.filter('webpack.module.rules.svg.use', [
            bud.loaders.get('svgr'),
            bud.loaders.get('url'),
        ])
    });
};
exports.svg = svg;
//# sourceMappingURL=svg.js.map