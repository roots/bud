/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
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
var processHandler = function (bud) {
    process.title = bud.hooks.filter('node_process_title', 'bud-cli');
    bud.logger.info({ name: 'process', value: process.title }, "title set");
    process.env.BABEL_ENV = bud.mode;
    bud.logger.info({ name: 'process', value: process.env.BABEL_ENV }, "BABEL_ENV set");
    process.env.NODE_ENV = bud.mode;
    bud.logger.info({ name: 'process', value: process.env.NODE_ENV }, "NODE_ENV set");
    var unhandledRejectionHandler = bud.hooks.filter('node_unhandled_rejection_handler', function (error) {
        bud.logger.error({ name: 'process', value: error }, "unhandled rejection error");
        process.exitCode = 1;
        process.nextTick(function () {
            bud.util.terminate();
        });
    });
    process.on('unhandledRejection', unhandledRejectionHandler);
};

export { processHandler };
