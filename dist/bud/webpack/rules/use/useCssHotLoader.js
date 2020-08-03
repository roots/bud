"use strict";
exports.__esModule = true;
exports.useCssHotLoader = void 0;
var useCssHotLoader = function (rule, bud) {
    var loader = bud.loaders.get('css-hot-loader');
    bud.logger.info({ name: rule, loader: loader }, "using css-hot-loader");
    return { loader: loader };
};
exports.useCssHotLoader = useCssHotLoader;
//# sourceMappingURL=useCssHotLoader.js.map