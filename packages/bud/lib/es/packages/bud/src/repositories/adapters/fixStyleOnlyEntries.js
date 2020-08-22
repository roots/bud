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
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries';

var fixStyleOnlyEntries = function (bud) { return ({
    bud: bud,
    name: 'webpack-fix-style-only-entries',
    options: bud.options.get('adapters.fixStyleOnlyEntries'),
    make: function () {
        if (this.bud.features.enabled('hot')) {
            this.options.ignore = 'webpack-hot-middleware';
        }
        return new FixStyleOnlyEntriesPlugin(this.options);
    },
    when: function () {
        return (this.bud.options.get('resolve.extensions').includes('.css') ||
            this.bud.options.get('resolve.extensions').includes('.scss') ||
            this.bud.options.get('resolve.extensions').includes('.sass'));
    },
}); };

export { fixStyleOnlyEntries };
