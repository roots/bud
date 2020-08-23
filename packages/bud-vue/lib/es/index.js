/**
 * @roots/bud-vue v.2.0.0-next.0 {@link undefined}
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
import adapter from './adapter.js';
import rule from './rule.js';

const addVueStyle = (loaders) => [
    'vue-style-loader',
    ...loaders,
];
/**
 * @roots/bud-vue
 *
 * Adds vue support to the Bud framework.
 */
const vue = (bud) => ({
    bud,
    name: 'vue',
    make: function () {
        !this.bud.options
            .get('webpack.resolve.extensions')
            .includes('.vue') &&
            this.bud.options.set('webpack.resolve.extensions', [
                ...this.bud.options.get('webpack.resolve.extensions'),
                '.vue',
            ]);
        this.bud.adapters.add(adapter);
        this.bud.alias({
            vue$: 'vue/dist/vue.esm.js',
        });
        this.bud.rules.repository = [...this.bud.rules.repository, rule];
        this.bud.hooks.on('webpack.module.rules.css.use', addVueStyle);
        this.bud.hooks.on('webpack.module.rules.scss.use', addVueStyle);
    },
});
module.exports = vue;
