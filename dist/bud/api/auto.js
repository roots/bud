"use strict";
exports.__esModule = true;
exports.auto = void 0;
var auto = function (options) {
    var _this = this;
    Object.entries(options).forEach(function (_a) {
        var key = _a[0], modules = _a[1];
        modules.forEach(function (handle) {
            var _a;
            _this.options.merge('auto', (_a = {}, _a[handle] = key, _a));
        });
    });
    return this;
};
exports.auto = auto;
//# sourceMappingURL=auto.js.map