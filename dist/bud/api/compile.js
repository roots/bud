"use strict";
exports.__esModule = true;
exports.compile = void 0;
/**
 * ## bud.compile
 *
 * Compile webpack configuration and run build.
 *
 * ```
 * bud.compile()
 * ```
 **/
var compile = function () {
    this.util.setProcess(this);
    this.compiler(this);
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map