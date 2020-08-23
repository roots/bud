"use strict";
exports.__esModule = true;
exports.processHandler = void 0;
var terminate_1 = require("./terminate");
var processHandler = function () {
    process.on('unhandledRejection', function (error) {
        process.exitCode = 1;
        process.nextTick(function () {
            console.error(error);
            terminate_1.terminate();
        });
    });
};
exports.processHandler = processHandler;
//# sourceMappingURL=processHandler.js.map