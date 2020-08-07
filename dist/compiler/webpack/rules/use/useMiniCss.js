var useMiniCss = function (rule, bud) {
    var isHot = bud.features.enabled('hot');
    var loader = bud.loaders.get('miniCss');
    var options = {};
    if (isHot) {
        options.hmr = true;
    }
    bud.logger.info({
        name: rule,
        loader: loader,
        options: options,
        isHot: isHot
    }, "using mini-css");
    return { loader: loader, options: options };
};
export { useMiniCss };
//# sourceMappingURL=useMiniCss.js.map