"use strict";
exports.__esModule = true;
exports.output = void 0;
/**
 * Webpack output.
 */
var output = function (bud) { return ({
    bud: bud,
    options: {
        output: {
            path: bud.paths.dist,
            publicPath: bud.paths.public,
            filename: bud.features.hash
                ? '[name].[hash:8].js'
                : '[name].js'
        }
    },
    make: function () {
        this.preHook();
        this.postHook();
        return this.options;
    },
    preHook: function () {
        this.bud.hooks.call('pre_output', {
            options: this.options,
            bud: this.bud
        });
    },
    postHook: function () {
        this.bud.hooks.call('post_output', {
            options: this.options,
            bud: this.bud
        });
    }
}); };
exports.output = output;
