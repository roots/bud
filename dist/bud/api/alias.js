"use strict";
exports.__esModule = true;
exports.alias = void 0;
var alias = function (options) {
    this.hooks.call('pre_alias', options);
    this.options.merge('alias', options);
    this.hooks.call('post_alias');
    return this;
};
exports.alias = alias;
//# sourceMappingURL=alias.js.map