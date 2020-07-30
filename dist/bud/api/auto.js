"use strict";
exports.__esModule = true;
exports.auto = void 0;
var auto = function (options) {
    var _this = this;
    this.hooks.call('pre_auto', options);
    Object.entries(options).forEach(function (_a) {
        var key = _a[0], modules = _a[1];
        modules.forEach(function (handle) {
            var _a;
            _this.options.merge('auto', (_a = {}, _a[handle] = key, _a));
        });
    });
    this.hooks.call('post_auto', this);
    return this;
};
exports.auto = auto;
//# sourceMappingURL=auto.js.map