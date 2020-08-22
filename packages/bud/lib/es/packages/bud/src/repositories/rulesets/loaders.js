/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

var loaders = {
    babel: require.resolve('babel-loader'),
    css: require.resolve('css-loader'),
    file: require.resolve('file-loader'),
    miniCss: MiniCssExtractPlugin.loader,
    postCss: require.resolve('postcss-loader'),
    resolveUrl: require.resolve('resolve-url-loader'),
    style: require.resolve('style-loader'),
    svgr: require.resolve('@svgr/webpack'),
    url: require.resolve('url-loader'),
};

export { loaders };
