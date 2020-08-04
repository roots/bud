"use strict";
exports.__esModule = true;
exports.compile = void 0;
var compile = function () {
    var compiler = this.hooks.filter('compiler', this.compiler);
    compiler.buildConfig().compile();
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map