"use strict";
exports.__esModule = true;
exports.compile = void 0;
var compile = function () {
    this.logger.info({ name: 'bud.api', "function": 'bud.compile' }, "bud.compile called");
    var compiler = this.hooks.filter('bud.compiler.filter', this.compiler);
    compiler.buildConfig().compile();
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map