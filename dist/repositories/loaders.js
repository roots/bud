import MiniCssExtractPlugin from 'mini-css-extract-plugin';
/**
 * Style loaders
 *
 * @type {object} loaders
 */
var loaders = {
    babel: require.resolve('babel-loader'),
    css: require.resolve('css-loader'),
    file: require.resolve('file-loader'),
    miniCss: MiniCssExtractPlugin.loader,
    postCss: require.resolve('postcss-loader'),
    resolveUrl: require.resolve('resolve-url-loader'),
    style: require.resolve('style-loader'),
    svgr: require.resolve('@svgr/webpack'),
    url: require.resolve('url-loader')
};
export { loaders };
//# sourceMappingURL=loaders.js.map