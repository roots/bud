"use strict";
exports.__esModule = true;
exports.sync = void 0;
/**
 * ## bud.sync
 *
 * Configure BrowserSync.
 *
 * ```js
 * bud.sync({
 *   enabled: !bud.inProduction,
 *   proxy: 'http://bud.test',
 *   host: 'localhost',
 *   port: 3000,
 * })
 * ```
 */
var sync = function (_a) {
    var enabled = _a.enabled, options = _a.options;
    this.state.features.browserSync =
        enabled || !this.inProduction;
    this.state.options.browserSync = {
        host: options.host ? options.host : 'localhost',
        port: options.port ? options.port : 3000,
        proxy: options.proxy ? options.proxy : null
    };
    return this;
};
exports.sync = sync;
//# sourceMappingURL=sync.js.map