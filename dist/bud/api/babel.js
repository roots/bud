"use strict";
exports.__esModule = true;
exports.babel = void 0;
var babel = function (options) {
    this.features.enable('babel');
    this.options.merge('babel', this.hooks.filter('filter_babel_options', options));
    this.hooks.call('post_babel');
    return this;
};
exports.babel = babel;
//# sourceMappingURL=babel.js.map