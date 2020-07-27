#!/usr/bin/env node
"use strict";
exports.__esModule = true;
exports.run = void 0;
var path_1 = require("path");
var compiler_1 = require("./compiler");
var getProjectConfig = function () {
    var projectDir = process.cwd();
    var config = path_1.join(projectDir, 'bud.config.js');
    return config;
};
var setProcess = function (bud) {
    process.title = 'bud-cli';
    process.env.BABEL_ENV = bud.mode;
    process.env.NODE_ENV = bud.mode;
    process.on('unhandledRejection', function (error) {
        process.exitCode = 1;
        process.nextTick(function () {
            bud.hooks.call('compile_error', { bud: bud, error: error });
            bud.util.terminate(bud);
        });
    });
};
/** 🚀 */
exports.run = function () {
    var bud = require(getProjectConfig());
    setProcess(bud);
    compiler_1.compiler(bud);
};
//# sourceMappingURL=bin.js.map