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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.glob = void 0;
var globby_1 = __importDefault(require("globby"));
var path_1 = require("path");
var glob = function (files) {
    var _this = this;
    var entry = this.options.get('entry');
    var included = globby_1["default"].sync(this.src(files), {
        expandDirectories: true
    });
    this.util.usedExt(included, this);
    included.forEach(function (match) {
        var _a;
        var dest = match.replace(_this.src('/'), '').replace(path_1.parse(match).ext, '');
        entry = __assign(__assign({}, entry), (_a = {}, _a[dest] = match, _a));
    });
    this.options.set('entry', entry);
    return this;
};
exports.glob = glob;
//# sourceMappingURL=glob.js.map