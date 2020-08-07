var useFile = function (rule, bud) {
    var loader = bud.hooks.filter('webpack.rules.fileloader.loader', bud.loaders.get('file'));
    var options = bud.hooks.filter('webpack.rules.fileloader.options', {
        name: '[path][name].[ext]'
    });
    bud.logger.info({ name: rule, loader: loader }, "using file-loader");
    return {
        loader: loader,
        options: options
    };
};
export { useFile };
//# sourceMappingURL=useFile.js.map