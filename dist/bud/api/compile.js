"use strict";
exports.__esModule = true;
exports.compile = void 0;
var compile = function () {
    this.hooks.call('pre_node_process');
    this.util.setProcess(this);
    this.hooks.call('post_node_process');
    this.hooks.call('pre_compiler_call');
    this.compiler(this);
};
exports.compile = compile;
//# sourceMappingURL=compile.js.map