/**
 * @roots/bud-purgecss v.1.0.0 {@link https://roots.io/bud}
 *
 * Adds purgecss support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { config } from './api.js';
import wordpress from 'purgecss-with-wordpress';

/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 *
 * @type {Extension}
 */
const purgecss = (bud) => ({
    bud,
    name: 'purgecss',
    make: function () {
        this.bud.apply('purgecss', config);
    },
});
const presets = { wordpress };

export { presets, purgecss };
