/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
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

export { terminate };
