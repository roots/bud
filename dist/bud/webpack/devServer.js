"use strict";
exports.__esModule = true;
exports.devServer = void 0;
/**
 * Dev server
 * @param {Bud} bud
 */
var devServer = function (bud) { return ({
    bud: bud,
    target: {
        devServer: bud.options.get('dev')
    },
    make: function () {
        this.target = this.bud.hooks.filter('webpack_devServer', this.target);
        this.bud.logger.info({ name: 'webpack.devServer', value: this.target }, "webpack.devServer has been generated");
        return this.target;
    }
}); };
exports.devServer = devServer;
//# sourceMappingURL=devServer.js.map