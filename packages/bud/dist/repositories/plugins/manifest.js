import ManifestPlugin from 'webpack-manifest-plugin';
var manifest = function () { return ({
    setOptions: function () {
        var _a;
        return {
            publicPath: (_a = this.bud.paths.public) !== null && _a !== void 0 ? _a : '/',
            filename: 'manifest.json',
            writeToFileEmit: true
        };
    },
    make: function () {
        return new ManifestPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('manifest');
    }
}); };
export { manifest };
//# sourceMappingURL=manifest.js.map