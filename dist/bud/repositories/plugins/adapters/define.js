"use strict";
exports.__esModule = true;
exports.define = void 0;
var webpack_1 = require("webpack");
var define = {
    mergeOptions: function () {
        return this.bud.options.get('env');
    },
    make: function () {
        return new webpack_1.DefinePlugin(this.options);
    },
    when: function () {
        return this.options;
    }
};
exports.define = define;
//# sourceMappingURL=define.js.map