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
import vueTemplateCompiler from './vue-template-compiler/index.js';

const loader = require.resolve('vue-loader');
/**
 * Vue SFC rule
 */
const rule = () => ({
    test: /\.vue$/,
    exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
    use: [
        {
            loader,
            options: {
                compiler: vueTemplateCompiler,
            },
        },
    ],
});

export default rule;
