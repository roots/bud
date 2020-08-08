var useResolveUrl = function (rule, bud) {
    var loader = bud.loaders.get('resolveUrl');
    var options = {
        sourceMap: bud.features.enabled('sourceMap'),
        debug: true
    };
    bud.logger.info({ name: rule, loader: loader, options: options }, "using resolve-url-loader");
    return { loader: loader, options: options };
};
export { useResolveUrl };
//# sourceMappingURL=useResolveUrl.js.map