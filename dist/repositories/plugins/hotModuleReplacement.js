import { HotModuleReplacementPlugin } from 'webpack';
var hotModuleReplacement = function () { return ({
    setOptions: function () {
        return this.bud.options.get('hotModuleReplacement');
    },
    make: function () {
        return new HotModuleReplacementPlugin();
    },
    when: function () {
        return this.bud.features.enabled('hot');
    }
}); };
export { hotModuleReplacement };
//# sourceMappingURL=hotModuleReplacement.js.map