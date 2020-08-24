"use strict";
exports.__esModule = true;
exports.compile = void 0;
var compile = function () {
    this.hooks
        .filter('api.compile', this.compiler(this, this.config.build))
        .buildConfig()
        .compile();
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map