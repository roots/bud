"use strict";
exports.__esModule = true;
exports.config = void 0;
var config = function () {
    this.logger.info({ name: 'bud.api', "function": 'bud.config' }, "bud.config called");
    var compiler = this.hooks.filter('bud.compiler.filter', this.compiler);
    return compiler.buildConfig();
};
exports.config = config;
//# sourceMappingURL=config.js.map