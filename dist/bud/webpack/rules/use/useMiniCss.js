"use strict";
exports.__esModule = true;
exports.useMiniCss = void 0;
var useMiniCss = function (rule, bud) {
    var isHot = bud.features.enabled('hot');
    var loader = bud.loaders.get('miniCss');
    var options = {};
    if (isHot) {
        options.hot = true;
    }
    bud.logger.info({ name: rule, loader: loader, options: options, isHot: isHot }, "using mini-css");
    return { loader: loader, options: options };
};
exports.useMiniCss = useMiniCss;
//# sourceMappingURL=useMiniCss.js.map