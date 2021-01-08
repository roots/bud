"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRules = exports.setItems = exports.setLoaders = void 0;
/**
 * @svgr-loader register loader
 */
exports.setLoaders = [
    '@svgr-loader',
    require.resolve('@svgr/webpack'),
];
/**
 * @svgr-loader register loader
 */
exports.setItems = [
    '@svgr',
    {
        ident: '@svgr',
        loader: '@svgr-loader',
    },
];
/**
 * @svgr-loader register use
 */
exports.setRules = [
    '@svgr',
    {
        test({ store }) {
            return store.get('patterns.svg');
        },
        use({ build }) {
            return [build.items.get('@svgr')];
        },
    },
];
//# sourceMappingURL=index.js.map