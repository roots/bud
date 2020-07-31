"use strict";
exports.__esModule = true;
exports.general = void 0;
/**
 * General webpack options
 *
 * @this {bud}
 */
var general = function (bud) { return ({
    bud: bud,
    options: {
        context: bud.paths.get('project'),
        devtool: bud.features.enabled('sourceMap')
            ? bud.options.get('devtool')
            : false,
        mode: bud.mode,
        target: bud.options.get('target'),
        watch: bud.features.enabled('watch')
    },
    make: function () {
        /**
         * Empty out non web globals so they aren't
         * inadvertently used in project bundles.
         */
        if (this.bud.options.is('target', 'web')) {
            this.options.node = this.bud.hooks.filter('filter_webpack_node', {
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
        return this.bud.hooks.filter('filter_webpack_final', this.options);
    }
}); };
exports.general = general;
//# sourceMappingURL=general.js.map