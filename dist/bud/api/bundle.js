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
exports.bundle = void 0;
var bundle = function (name, entries) {
    var _a;
    this.hooks.call('pre_bundle', { name: name, entries: entries });
    /**
     * Lazy load whatever loaders are needed to fulfill the
     * bundle requirements.
     */
    this.util.usedExt(entries, this);
    this.options.set('entry', __assign(__assign({}, this.options.get('entry')), this.hooks.filter('filter_bundle_options', (_a = {},
        _a["" + name] = entries,
        _a))));
    this.hooks.call('post_bundle');
    return this;
};
exports.bundle = bundle;
//# sourceMappingURL=bundle.js.map