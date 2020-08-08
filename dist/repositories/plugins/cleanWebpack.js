import { CleanWebpackPlugin as Plugin } from 'clean-webpack-plugin';
var cleanWebpack = function () { return ({
    make: function () {
        return new Plugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('clean');
    }
}); };
export { cleanWebpack };
//# sourceMappingURL=cleanWebpack.js.map