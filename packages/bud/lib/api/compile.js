"use strict";
exports.__esModule = true;
exports.compile = void 0;
var compile = function () {
    this.hooks
        .filter('bud.compiler.filter', this.compiler)
        .buildConfig()
        .compile();
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map