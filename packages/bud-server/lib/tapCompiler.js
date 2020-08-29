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
exports["default"] = void 0;
var createDomain_1 = __importDefault(require("./createDomain"));
var tapCompiler = function (bud) {
    bud.compiler.hooks.afterEmit.tap('bud', function () {
        bud.fs.readJson(bud.dist('manifest.json')).then(function (assets) {
            bud.fs.writeJson(bud.dist('manifest.json'), Object.entries(assets).reduce(function (acc, _a) {
                var _b;
                var key = _a[0], value = _a[1];
                return (__assign(__assign({}, (acc ? acc : [])), (_b = {}, _b[key] = "" + createDomain_1["default"](bud) + value, _b)));
            }, {}));
        });
    });
};
exports["default"] = tapCompiler;
//# sourceMappingURL=tapCompiler.js.map