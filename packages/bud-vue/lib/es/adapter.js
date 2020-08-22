/**
 * @roots/bud-vue v.1.0.0 {@link undefined}
 *
 * Adds Vue support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { VueLoaderPlugin } from 'vue-loader';

const adapter = (bud) => ({
    bud,
    name: 'vue',
    make: function () {
        return new VueLoaderPlugin();
    },
});

export default adapter;
