"use strict";
exports.__esModule = true;
exports.useResolveUrl = void 0;
var useResolveUrl = function (rule, bud) {
    var loader = bud.loaders.get('resolveUrl');
    var options = {
        engine: null,
        sourceMap: bud.features.enabled('sourceMap'),
        debug: true
    };
    if (bud.features.enabled('postCss')) {
        options.engine = 'postcss';
        bud.logger.info({ name: rule, engine: options.engine }, "postcss enabled. resolve-url-loader is using postcss engine.");
    }
    bud.logger.info({ name: rule, loader: loader, options: options }, "using resolve-url-loader");
    return { loader: loader, options: options };
};
exports.useResolveUrl = useResolveUrl;
//# sourceMappingURL=useResolveUrl.js.map