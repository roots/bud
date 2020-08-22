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

export default use;
