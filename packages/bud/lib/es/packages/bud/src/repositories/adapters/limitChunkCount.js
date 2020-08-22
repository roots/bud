/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
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
import { optimize } from 'webpack';

var LimitChunkCountPlugin = optimize.LimitChunkCountPlugin;
var limitChunkCount = function (bud) { return ({
    bud: bud,
    name: 'limit-chunk-count-plugin',
    setOptions: function () {
        var enabled = this.bud.features.enabled('splitting');
        var chunks = this.bud.options.get('splitting').maxChunks;
        if (!enabled) {
            return {
                maxChunks: 1,
            };
        }
        if (chunks) {
            return {
                maxChunks: chunks,
            };
        }
        return null;
    },
    make: function () {
        return new LimitChunkCountPlugin(this.options);
    },
    when: function () {
        return this.options;
    },
}); };

export { limitChunkCount };
