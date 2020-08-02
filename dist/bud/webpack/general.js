"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.general = void 0;
/**
 * General webpack options
 *
 * @this {bud}
 */
var general = function (bud) { return ({
    bud: bud,
    target: {
        context: bud.hooks.filter('webpack_context', bud.paths.get('project')),
        devtool: bud.hooks.filter('webpack_devtool', bud.features.enabled('sourceMap') ? bud.options.get('devtool') : false),
        mode: bud.hooks.filter('webpack_mode', bud.mode),
        target: bud.hooks.filter('webpack_target', bud.options.get('target')),
        watch: bud.hooks.filter('webpack_watch', bud.features.enabled('watch'))
    },
    make: function () {
        /**
         * Empty out node globals that aren't native to web
         * to ensure they aren't inadvertently used in project bundles
         * intended for the browser..
         */
        if (this.bud.options.is('target', 'web')) {
            this.target.node = this.bud.hooks.filter('webpack_node', {
                module: 'empty',
                dgram: 'empty',
                dns: 'mock',
                fs: 'empty',
                http2: 'empty',
                net: 'empty',
                tls: 'empty',
                child_process: 'empty'
            });
        }
        this.target = this.bud.hooks.filter('webpack_general', this.target);
        this.bud.logger.info(__assign({ name: 'webpack_general' }, this.target), "webpack general config has been generated");
        return this.target;
    }
}); };
exports.general = general;
//# sourceMappingURL=general.js.map