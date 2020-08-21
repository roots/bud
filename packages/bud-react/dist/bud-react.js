/**
* @roots/bud-react v1.0.0
* Adds react support to Bud
*
* Consider funding our tools <https://github.com/sponsors/roots>
*
* @copyright Roots <https://roots.io/bud>
* @license MIT
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const react = (bud) => ({
    bud,
    make: function () {
        this.bud.options.set('babel.presets', [
            ...this.bud.options.get('babel.presets'),
            react,
        ]);
        !this.bud.options.get('resolve.extensions').includes('.jsx') &&
            this.bud.options.set('resolve.extensions', [
                ...this.bud.options.get('resolve.extensions'),
                '.jsx',
            ]);
    },
});

exports.react = react;
