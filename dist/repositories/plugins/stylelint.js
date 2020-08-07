import StylelintPlugin from 'stylelint-webpack-plugin';
var stylelint = function () { return ({
    setOptions: function () {
        return {
            configFile: this.bud.configs.get('stylelint')
        };
    },
    make: function () {
        return new StylelintPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('stylelint');
    }
}); };
export { stylelint };
//# sourceMappingURL=stylelint.js.map