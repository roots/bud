var useStyle = function (rule, bud) {
    var loader = bud.loaders.get('style');
    bud.logger.info({ name: rule, loader: loader }, "using style-loader");
    return { loader: loader };
};
export { useStyle };
//# sourceMappingURL=useStyle.js.map