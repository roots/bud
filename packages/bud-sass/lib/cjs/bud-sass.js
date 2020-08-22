/**
 * @roots/bud-sass v.2.0.0-next.0 {@link undefined}
 *
 * Adds sass support to Bud.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * ## bud.scss
 *
 * Enable/disable scss support
 *
 * ```js
 * bud.scss(true)
 * ```
 *
 * ```js
 * bud.scss(false)
 * ```
 */
const config = function (enabled, options) {
    if (options) {
        this.options.merge('sass', options);
    }
    return this;
};

const use = (bud) => ({
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

/**
 * Sass webpack module rule.
 *
 * @type {Rule}
 */
const rule = (bud) => ({
    test: /\.s(c|a)ss$/,
    exclude: bud.patterns.get('vendor'),
    use: [
        bud.uses.get('miniCss')(bud),
        bud.uses.get('css')(bud),
        bud.uses.get('resolveUrl')(bud),
        bud.uses.get('postCss')(bud),
        use(bud),
    ],
});
/**
 * Bud extension: sass
 *
 * Adds sass support to the Bud framework.
 *
 * @type {Extension}
 */
const sass = (bud) => ({
    bud,
    name: 'sass',
    make: function () {
        !this.bud.options.get('resolve.extensions').includes('.sass') &&
            this.bud.options.set('resolve.extensions', [
                ...this.bud.options.get('resolve.extensions'),
                '.sass',
            ]);
        !this.bud.options.get('resolve.extensions').includes('.scss') &&
            this.bud.options.set('resolve.extensions', [
                ...this.bud.options.get('resolve.extensions'),
                '.scss',
            ]);
        this.bud.apply('sass', config);
        this.bud.rules.repository = [...this.bud.rules.repository, rule];
    },
});

exports.sass = sass;
