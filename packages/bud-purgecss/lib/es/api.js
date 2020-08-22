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
import purgecss from '@fullhuman/postcss-purgecss';

/**
 * ## bud.purge
 *
 * Purge unused CSS from compiled stylesheets
 *
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 *
 * ```js
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
const config = function (options) {
    this.options.set('postcss.plugins', [
        ...this.options.get('postcss.plugins'),
        purgecss(options.options),
    ]);
    return this;
};

export { config };
