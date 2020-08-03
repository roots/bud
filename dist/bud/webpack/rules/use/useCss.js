"use strict";
exports.__esModule = true;
exports.useCss = void 0;
var moduleOptions = {
    modules: true,
    onlyLocals: false
};
var useCss = function (rule, bud, module) {
    var loader = bud.loaders.get('css');
    var options = module ? moduleOptions : null;
    bud.logger.info({ name: rule, loader: loader }, "using css-loader");
    if (!options) {
        return { loader: loader };
    }
    bud.logger.info({ name: rule, options: options }, "css-loader configured for css modules");
    return { loader: loader, options: options };
};
exports.useCss = useCss;
//# sourceMappingURL=useCss.js.map