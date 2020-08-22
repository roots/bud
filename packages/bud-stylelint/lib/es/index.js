/**
 * @roots/bud-stylelint v.2.0.0-next.0 {@link undefined}
 *
 * Adds stylelint support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { join, resolve } from 'path';
import adapter from './adapter.js';
import api from './api.js';

/**
 * Bud extension: Stylelint support.
 */
const stylelint = (bud) => ({
    bud,
    name: 'stylelint',
    make: function () {
        /**
         * Load .stylelintrc.js and bail early if not found.
         */
        const config = join(this.bud.project('stylelint.config.js'));
        if (!this.bud.fs.existsSync(config)) {
            return;
        }
        /**
         * Set bud.stylelint API method.
         */
        this.bud.apply('stylelint', api);
        /**
         * Set stylelint to config container
         */
        this.bud.configs.set('stylelint', config);
        /**
         * Enable stylelint support
         */
        this.bud.features.set('stylelint', true);
        /**
         * Add stylelint webpack adapter
         */
        this.bud.adapters.add(adapter);
    },
});
const preset = {
    roots: resolve(__dirname, './preset/index.js'),
};

export { preset, stylelint };
