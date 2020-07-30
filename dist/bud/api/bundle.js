"use strict";
exports.__esModule = true;
exports.bundle = void 0;
var bundle = function (name, entries) {
    var _a;
    this.hooks.call('pre_bundle', { name: name, entries: entries });
    this.options.merge('entry', this.hooks.filter('filter_bundle_options', (_a = {},
        _a["" + name] = entries,
        _a)));
    this.hooks.call('post_bundle');
    return this;
};
exports.bundle = bundle;
//# sourceMappingURL=bundle.js.map