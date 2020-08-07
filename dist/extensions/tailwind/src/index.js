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
var tailwind = function () { return ({
    make: function () {
        this.bud.options.set('postCss', this.postCssOptions());
        this.bud.options.set('scss', this.scssOptions());
    },
    postCssOptions: function () {
        var postCss = this.bud.options.get('postCss');
        postCss.plugins = __spreadArrays([
            require('tailwindcss')
        ], postCss.plugins);
        return postCss;
    },
    scssOptions: function () {
        var scss = this.bud.options.get('scss');
        scss.sassOptions = __assign({ processCssUrls: false }, scss.sassOptions);
        return scss;
    }
}); };
module.exports = tailwind;
//# sourceMappingURL=index.js.map