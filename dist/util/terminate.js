var terminate = function (options) {
    if (options === void 0) { options = {
        dump: false,
        timeout: 500
    }; }
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
export { terminate };
//# sourceMappingURL=terminate.js.map