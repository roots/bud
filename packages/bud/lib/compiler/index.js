"use strict";
exports.__esModule = true;
exports.compiler = void 0;
var webpack_1 = require("./webpack");
var renderCompilerDashboard_1 = require("./renderCompilerDashboard");
var compiler = function (bud) { return ({
    bud: bud,
    dashboardEnabled: function () {
        return this.bud.features.enabled('dashboard');
    },
    buildConfig: function () {
        this.config = webpack_1.build(this.bud);
        return this;
    },
    compile: function () {
        renderCompilerDashboard_1.renderCompilerDashboard(this.bud, this.config);
    }
}); };
exports.compiler = compiler;
//# sourceMappingURL=index.js.map