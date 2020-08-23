/**
 * @roots/bud-react v.2.0.0-next.0 {@link https://roots.io/bud}
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
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const react = (bud) => ({
    bud,
    name: 'react',
    make: function () {
        this.bud.options.set('babel.presets', [
            ...this.bud.options.get('babel.presets'),
            require.resolve('@babel/preset-react'),
        ]);
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.jsx') &&
            this.bud.options.set('webpack.resolve.extensions', [
                ...this.bud.options.get('webpack.resolve.extensions'),
                '.jsx',
            ]);
    },
});

exports.react = react;
