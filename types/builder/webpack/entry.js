"use strict";
exports.__esModule = true;
exports.entry = void 0;
/**
 * Entrypoints
 *
 * @param {object} entry
 * @return {typeof import('webpack').entry} entry
 */
var entry = function (bud) { return ({
    bud: bud,
    options: {
        entry: bud.options.entry
    },
    make: function () {
        this.preHook();
        this.postHook();
        return this.options;
    },
    preHook: function () {
        this.bud.hooks.call('pre_entry', this.options);
    },
    postHook: function () {
        this.bud.hooks.call('post_entry', this.options);
    }
}); };
exports.entry = entry;
