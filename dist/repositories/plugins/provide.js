import { ProvidePlugin } from 'webpack';
var provide = function () { return ({
    setOptions: function () {
        return this.bud.options.get('auto');
    },
    make: function () {
        return new ProvidePlugin(this.options);
    },
    when: function () {
        return this.bud.options.has('auto');
    }
}); };
export { provide };
//# sourceMappingURL=provide.js.map