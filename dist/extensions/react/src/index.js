var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
var adapter = function () { return ({
    mergeOptions: function () {
        return this.bud.options.get('dependencyManifest');
    },
    make: function () {
        return new DependencyExtractionWebpackPlugin(this.bud.options.get('dependencyExtraction'));
    }
}); };
var vue = function () { return ({
    make: function () {
        this.bud.options.set('extensions', __spreadArrays([
            '.jsx'
        ], this.bud.options.get('extensions')));
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