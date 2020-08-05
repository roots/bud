"use strict";
exports.__esModule = true;
exports.alias = void 0;
var alias = function (options) {
    this.logger.info({ name: 'bud.api', "function": 'bud.alias', options: options }, "bud.alias called");
    this.hooks.call('pre_alias');
    var aliases = this.hooks.filter('api.alias.filter', options);
    this.options.set('alias', aliases);
    this.hooks.call('post_alias');
    return this;
};
exports.alias = alias;
//# sourceMappingURL=alias.js.map