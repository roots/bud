"use strict";
exports.__esModule = true;
exports.use = void 0;
var use = function (extensions) {
    var _this = this;
    extensions.map(function (extension) {
        _this.extensions(_this, extension).build();
    });
    return this;
};
exports.use = use;
//# sourceMappingURL=use.js.map