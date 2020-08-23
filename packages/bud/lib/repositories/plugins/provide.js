"use strict";
exports.__esModule = true;
exports.provide = void 0;
var webpack_1 = require("webpack");
var provide = function (bud) { return ({
    bud: bud,
    name: 'provide-plugin',
    options: bud.env.entries(),
    make: function () {
        return new webpack_1.ProvidePlugin(this.options);
    },
    when: function () {
        return this.options;
    }
}); };
exports.provide = provide;
//# sourceMappingURL=provide.js.map