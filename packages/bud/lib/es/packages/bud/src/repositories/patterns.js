/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
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
var patterns = {
    repository: 'patterns',
    contents: {
        js: /\.(js|jsx)$/,
        ts: /\.(ts|tsx)$/,
        vue: /\.vue$/,
        scss: /\.scss$/,
        scssModule: /\.module\.scss$/,
        css: /\.css$/,
        cssModule: /\.module\.css$/,
        svg: /\.svg$/,
        font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
        vendor: /node_modules/,
        image: /\.(png|svg|jpg|gif)$/,
    },
};

export { patterns };
