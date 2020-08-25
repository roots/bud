"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.glob = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var globby = require('globby');
var glob = function (name, files) {
    var _this = this;
    var entry;
    var included = globby.sync(files, {
        expandDirectories: true
    });
    included.forEach(function (file) {
        var _a;
        _this.addExtensions([file.split('.').pop()]);
        entry = __assign(__assign({}, _this.options.get('webpack.entry')), (_a = {}, _a[name + "/"] = file, _a));
    });
    this.options.set('webpack.entry', entry);
    return this;
};
exports.glob = glob;
//# sourceMappingURL=glob.js.map