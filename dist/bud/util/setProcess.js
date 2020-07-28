"use strict";
exports.__esModule = true;
exports.setProcess = void 0;
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
exports.setProcess = setProcess;
//# sourceMappingURL=setProcess.js.map