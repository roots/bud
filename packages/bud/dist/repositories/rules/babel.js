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
var babel = function (bud) { return ({
    test: bud.patterns.get('js'),
    exclude: bud.patterns.get('vendor'),
    use: [
        {
            loader: bud.loaders.get('babel'),
            options: __assign({ cacheDirectory: true, cacheCompression: bud.inProduction }, bud.options.get('babel'))
        },
    ]
}); };
export { babel };
//# sourceMappingURL=babel.js.map