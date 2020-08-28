"use strict";
exports.__esModule = true;
exports.terminate = void 0;
var terminate = function (options) {
    var exit = function (code) {
        (options === null || options === void 0 ? void 0 : options.dump) ? process.abort() : process.exit(code);
    };
    return function () { return function (err) {
        var _a;
        if (err) {
            console.log(err.message, err.stack);
        }
        setTimeout(exit, (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : 0).unref();
    }; };
};
exports.terminate = terminate;
//# sourceMappingURL=terminate.js.map