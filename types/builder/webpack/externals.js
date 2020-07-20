"use strict";
exports.__esModule = true;
exports.externals = void 0;
/**
 * Externals
 */
var externals = function (bud) { return ({
    bud: bud,
    options: {
        externals: bud.options.externals
    },
    make: function () {
        this.pre();
        this.post();
        return this.options;
    },
    pre: function () {
        this.bud.hooks.call('pre_externals', {
            options: this.options,
            bud: this.bud
        });
    },
    post: function () {
        this.bud.hooks.call('post_externals', {
            options: this.options,
            bud: this.bud
        });
    }
}); };
exports.externals = externals;
