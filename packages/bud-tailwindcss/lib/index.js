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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.tailwindcss = void 0;
var tailwindcss_1 = __importDefault(require("tailwindcss"));
var tailwindcss = function () { return ({
    make: function () {
        this.bud.apply('tailwind', function (config) {
            this.options.set('postcss', __assign(__assign({}, this.options.get('postcss')), { plugins: __spreadArrays(this.options.get('postcss.plugins'), [
                    tailwindcss_1["default"](config),
                ]) }));
            return this;
        });
        this.bud.options.set('postcss.plugins', __spreadArrays(this.bud.options.get('postcss.plugins'), [
            tailwindcss_1["default"]({
                config: this.bud.project('tailwind.config.js')
            }),
        ]));
        this.bud.options.set('sass.sassOptions', __assign({ processCssUrls: false }, this.bud.options.get('sass.sassOptions')));
    }
}); };
exports.tailwindcss = tailwindcss;
//# sourceMappingURL=index.js.map