"use strict";
exports.__esModule = true;
exports.compiler = void 0;
var webpack_1 = require("./webpack");
var renderCompilerDashboard_1 = require("./renderCompilerDashboard");
var renderSafeMode_1 = require("./renderSafeMode");
var compiler = function (bud) { return ({
    bud: bud,
    dashboardEnabled: function () {
        return this.bud.features.enabled('dashboard');
    },
    buildConfig: function () {
        this.config = webpack_1.build(this.bud).make();
        return this;
    },
    compile: function () {
        this.bud.hooks.call('compiler.dashboard.pre');
        this.dashboardEnabled()
            ? renderCompilerDashboard_1.renderCompilerDashboard(this.bud, this.config) // enabled: bud compiler
            : renderSafeMode_1.compileSafeMode(this.bud, this.config); // disabled: simple stats output
        this.bud.hooks.call('compiler.dashboard.post');
    }
}); };
exports.compiler = compiler;
//# sourceMappingURL=index.js.map