"use strict";
exports.__esModule = true;
exports.define = void 0;
var webpack_1 = require("webpack");
var define = function (bud) {
    var _a;
    return ({
        bud: bud,
        name: 'define',
        options: (_a = bud.env.entries()) !== null && _a !== void 0 ? _a : false,
        make: function () {
            return new webpack_1.DefinePlugin(this.options);
        },
        when: function () {
            return this.options;
        }
    });
};
exports.define = define;
//# sourceMappingURL=define.js.map