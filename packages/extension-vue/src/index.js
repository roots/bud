"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = exports.setItems = exports.setLoaders = void 0;
const vue_loader_1 = require("vue-loader");
/** Patched compiler.*/
/* eslint-disable */
const compiler = require('./vue-template-compiler/index');
exports.setLoaders = {
    vue: require.resolve('vue-loader'),
};
exports.setItems = {
    vue: {
        ident: 'vue',
        loader: 'vue',
        options: {
            compiler,
        },
    },
};
/**
 * Boot the Vue extension.
 */
const boot = bud => {
    /**
     * Add vue loader style rules.
     */
    ;
    ['css', 'sass'].map(rule => bud.build.rules.has(rule) &&
        bud.build.rules.mutate(`${rule}.use`, use => [
            ...use.splice(0, 1),
            bud.build.items.get('vue'),
            ...use.splice(1),
        ]));
    /**
     * vue-loader-plugin doesn't recognize the rule
     * as being set if it is set as a `oneOf` rule.
     *
     * So, instead of registering the rule through the normal
     * export function this hook registers the rule in the
     * outer `webpack.module.rules` key.
     */
    bud.hooks.on('webpack.module.rules', rules => [
        ...rules,
        {
            test: /\.vue$/,
            use: bud.build.items.get('vue'),
        },
    ]);
    /**
     * Register vue-loader-plugin.
     */
    bud.extensions.set('vue-loader-plugin', {
        make: new vue_loader_1.VueLoaderPlugin(),
    });
    bud.store.mutate('webpack.resolve.alias', cfg => (Object.assign(Object.assign({}, cfg), { vue$: 'vue/dist/vue.esm.js' })));
    !bud.store
        .get('webpack.resolve.extensions')
        .includes('.vue') &&
        bud.store.mutate('webpack.resolve.extensions', ext => [
            ...ext,
            '.vue',
        ]);
};
exports.boot = boot;
//# sourceMappingURL=index.js.map