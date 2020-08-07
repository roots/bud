var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var adapter = function () { return ({
    make: function () {
        var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
        return new VueLoaderPlugin();
    }
}); };
var vue = function () { return ({
    make: function () {
        this.bud.features.enable('vue');
        this.bud.options.set('extensions', __spreadArrays([
            '.vue'
        ], this.bud.options.get('extensions')));
        this.bud.alias({ vue$: 'vue/dist/vue.common.js' });
        this.bud.hooks.on('webpack.module.rules', this.addVue);
        this.bud.hooks.on('webpack.module.rules.css.use', this.addVueStyle);
        this.bud.hooks.on('webpack.module.rules.scss.use', this.addVueStyle);
        this.bud.adapters.add(adapter);
    },
    /**
     * addVue
     *
     * Callback adding vue-loader to webpack.modules.
     */
    addVue: function (webpackModules) { return __spreadArrays([
        {
            test: /\.vue$/,
            use: [
                {
                    loader: require.resolve('vue-loader'),
                    compiler: require('vue-template-compiler')
                },
            ]
        }
    ], webpackModules); },
    /**
     * addVueStyle
     *
     * Callback adding vue-style-loader to webpack.modules.
     */
    addVueStyle: function (rules) { return __spreadArrays([
        'vue-style-loader'
    ], rules); }
}); };
module.exports = vue;
//# sourceMappingURL=index.js.map