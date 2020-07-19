"use strict";
exports.__esModule = true;
exports.resolveUrl = void 0;
var loaders_1 = require("./../util/loaders");
/**
 * @type {function} resolveUrl
 */
var resolveUrl = function (builder) { return ({
    builder: builder,
    loader: loaders_1.loaders.resolveUrl,
    options: {
        engine: 'postcss',
        sourceMap: builder.bud.features.map,
        debug: true
    },
    make: function () {
        this.builder.bud.hooks.call('pre_resolveurl', this);
        this.output = {
            loader: this.loader,
            options: this.options
        };
        this.builder.bud.hooks.call('post_resolveurl', this.output);
        return this.output;
    }
}); };
exports.resolveUrl = resolveUrl;
