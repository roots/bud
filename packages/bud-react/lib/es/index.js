/**
 * @roots/bud-react v.1.0.0 {@link https://roots.io/bud}
 *
 * Adds react support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
const react = (bud) => ({
    bud,
    name: 'react',
    make: function () {
        this.bud.options.set('babel.presets', [
            ...this.bud.options.get('babel.presets'),
            require.resolve('@babel/preset-react'),
        ]);
        !this.bud.options.get('resolve.extensions').includes('.jsx') &&
            this.bud.options.set('resolve.extensions', [
                ...this.bud.options.get('resolve.extensions'),
                '.jsx',
            ]);
    },
});

export { react };
