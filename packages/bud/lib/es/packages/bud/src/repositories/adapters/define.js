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
import { DefinePlugin } from 'webpack';

var define = function (bud) {
    var _a;
    return ({
        bud: bud,
        name: 'define',
        options: (_a = bud.env.entries()) !== null && _a !== void 0 ? _a : false,
        make: function () {
            return new DefinePlugin(this.options);
        },
        when: function () {
            return this.options;
        },
    });
};

export { define };
