"use strict";
exports.__esModule = true;
exports.use = void 0;
var lodash_1 = require("lodash");
var use = function (plugins) {
    var _this = this;
    if (lodash_1.isArray(plugins)) {
        plugins.forEach(function (plugin) {
            typeof plugin == 'function'
                ? _this.controller.use(plugin).build()
                : null;
        });
    }
    else {
        this.controller.use(plugins).build();
    }
    return this;
};
exports.use = use;
//# sourceMappingURL=use.js.map