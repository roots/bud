"use strict";
exports.__esModule = true;
exports.resolveUrl = void 0;
var loaders_1 = require("../util/loaders");
var resolveUrl = function (bud) { return ({
    bud: bud,
    loader: loaders_1.loaders.resolveUrl,
    options: {
        engine: 'postcss',
        sourceMap: bud.state.features.map,
        debug: true
    },
    make: function () {
        this.bud.hooks.call('pre_resolveurl', this);
        this.output = {
            loader: this.loader,
            options: this.options
        };
        this.bud.hooks.call('post_resolveurl', this.output);
        return this.output;
    }
}); };
exports.resolveUrl = resolveUrl;
//# sourceMappingURL=resolveUrl.js.map