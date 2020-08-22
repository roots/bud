/**
 * @roots/bud-tailwindcss v.2.0.0-next.0 {@link undefined}
 *
 * Adds tailwindcss support to Bud
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

var tailwind = require('tailwindcss');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var tailwind__default = /*#__PURE__*/_interopDefaultLegacy(tailwind);

/**
 * ## bud.tailwind
 *
 * Configure tailwindcss support
 *
 * ```js
 * bud.tailwind({config: bud.project('custom-tailwind.js')})
 * ```
 *
 * ```js
 * bud.tailwind(({theme}) => ({
 *  colors: {},
 *  // ...
 * }))
 * ```
 */
const configTailwind = function (config) {
    this.options.set('postCss', {
        ...this.options.postCss,
        plugins: [
            ...this.options.get('postCss').plugins,
            tailwind__default['default'](config),
        ],
    });
    return this;
};

const tailwindcss = (bud) => ({
    bud,
    name: 'tailwindcss',
    make: function () {
        this.bud.apply('tailwind', configTailwind);
        this.bud.options.set('postcss.plugins', [
            ...this.bud.options.get('postcss.plugins'),
            tailwind__default['default']({
                config: this.bud.project('tailwind.config.js'),
            }),
        ]);
        this.bud.options.set('scss.sassOptions', {
            processCssUrls: false,
            ...this.bud.options.get('scss.sassOptions'),
        });
    },
});

exports.tailwindcss = tailwindcss;
