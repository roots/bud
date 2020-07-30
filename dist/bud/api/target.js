"use strict";
exports.__esModule = true;
exports.target = void 0;
var target = function (target) {
    this.hooks.call('pre_target', target);
    this.options.set('target', this.hooks.filter('filter_target_option', target));
    this.hooks.call('post_target');
    return this;
};
exports.target = target;
//# sourceMappingURL=target.js.map