"use strict";
exports.__esModule = true;
exports.bundle = void 0;
var bundle = function (name, entries) {
    var _a;
    this.hooks.call('pre_bundle', { name: name, entries: entries });
    /**
     * Extensions used in bundle.
     */
    var usedExt = this.util.usedExt(entries, this);
    var used = this.hooks.filter('filter_api_bundle_extensions', usedExt);
    this.options.merge('entry', this.hooks.filter('filter_bundle_options', (_a = {},
        _a["" + name] = entries,
        _a)));
    this.hooks.call('post_bundle');
    return this;
};
exports.bundle = bundle;
//# sourceMappingURL=bundle.js.map