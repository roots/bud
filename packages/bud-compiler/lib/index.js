"use strict";
exports.__esModule = true;
exports.compiler = void 0;
var render_1 = require("./render");
var compiler = function (bud, config) { return ({
    bud: bud,
    config: config,
    compile: function () {
        render_1.render(this.bud, this.config);
    }
}); };
exports.compiler = compiler;
//# sourceMappingURL=index.js.map