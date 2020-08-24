"use strict";
exports.__esModule = true;
exports.compile = void 0;
var compile = function () {
    var compiler = this.compiler(this, this.config.build());
    compiler = this.hooks.filter('api.compile', compiler);
    compiler.compile();
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map