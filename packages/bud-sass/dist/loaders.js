"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const miniCss = (bud) => ({
    loader: bud.loaders.get('miniCss'),
    options: {
        hmr: bud.features.enabled('hot'),
    },
});
const css = (bud) => ({
    loader: bud.loaders.get('css'),
});
const resolveUrl = (bud) => ({
    loader: bud.loaders.get('resolveUrl'),
    options: {
        sourceMap: bud.features.enabled('sourceMap'),
    },
});
const postCss = (bud) => ({
    loader: bud.loaders.get('postCss'),
    options: {
        ident: 'postcss',
        parser: 'postcss-scss',
        ...bud.options.get('postCss'),
    },
});
const sass = (bud) => ({
    loader: require.resolve('sass-loader'),
    options: {
        ...bud.options.get('sass'),
        sourceMap: true,
        implementation: (() => {
            try {
                if (require.resolve('sass')) {
                    return require('sass');
                }
            }
            catch (_a) {
                return require('node-sass');
            }
        })(),
    },
});
exports.default = {
    miniCss,
    css,
    postCss,
    resolveUrl,
    sass,
};
//# sourceMappingURL=loaders.js.map