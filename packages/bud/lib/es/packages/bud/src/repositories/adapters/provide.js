/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
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
import { ProvidePlugin } from 'webpack';

var provide = function (bud) { return ({
    bud: bud,
    name: 'provide-plugin',
    options: bud.options.get('auto'),
    make: function () {
        return new ProvidePlugin(this.options);
    },
    when: function () {
        return this.bud.options.has('auto');
    },
}); };

export { provide };
