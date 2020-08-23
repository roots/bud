"use strict";
exports.__esModule = true;
exports.terminate = void 0;
/**
 * Terminate CLI execution
 */
var terminate = function (options) {
    var exit = function (code) {
        options.dump ? process.abort() : process.exit(code);
    };
    return function () { return function (err) {
        if (err && err instanceof Error) {
            console.log(err.message, err.stack);
        }
        setTimeout(exit, options.timeout).unref();
    }; };
};
exports.terminate = terminate;
//# sourceMappingURL=terminate.js.map