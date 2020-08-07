var moduleOptions = {
    modules: true,
    onlyLocals: false
};
var useCss = function (rule, bud, modular) {
    var loader = bud.loaders.get('css');
    var options = modular ? moduleOptions : null;
    bud.logger.info({ name: rule, loader: loader }, "using css-loader");
    if (!options) {
        return { loader: loader };
    }
    bud.logger.info({ name: rule, options: options }, "css-loader configured for css modules");
    return { loader: loader, options: options };
};
export { useCss };
//# sourceMappingURL=useCss.js.map