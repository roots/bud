/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { HotModuleReplacementPlugin } from 'webpack';

var hotModuleReplacement = function (bud) { return ({
    bud: bud,
    name: 'hot-module-replacement-plugin',
    options: bud.options.get('adapters.hotModuleReplacement'),
    make: function () {
        return new HotModuleReplacementPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('hot');
    },
}); };

export { hotModuleReplacement };
