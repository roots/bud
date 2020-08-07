var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var usePostCss = function (rule, bud) {
    var loader = bud.loaders.get('postCss');
    var options = {
        ident: 'postcss'
    };
    if (bud.features.enabled('scss')) {
        options = {
            parser: 'postcss-scss'
        };
        bud.logger.info({ name: rule, options: options }, "scss support enabled. using postcss-scss parser.");
    }
    options = __assign(__assign({}, options), bud.options.get('postCss'));
    bud.logger.info({ name: rule, loader: loader, options: options }, "using postcss-loader");
    return { loader: loader, options: options };
};
export { usePostCss };
//# sourceMappingURL=usePostCss.js.map