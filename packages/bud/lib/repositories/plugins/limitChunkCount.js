"use strict";
exports.__esModule = true;
exports.limitChunkCount = void 0;
var webpack_1 = require("webpack");
var LimitChunkCountPlugin = webpack_1.optimize.LimitChunkCountPlugin;
var limitChunkCount = function (bud) { return ({
    bud: bud,
    make: function () {
        var enabled = this.bud.features.enabled('splitChunks');
        var chunks = this.bud.options.get('splitting.maxChunks');
        this.options = !enabled
            ? { maxChunks: 1 }
            : chunks
                ? { maxChunks: chunks }
                : {};
        return new LimitChunkCountPlugin(this.options);
    },
    when: function () {
        return this.options ? true : false;
    }
}); };
exports.limitChunkCount = limitChunkCount;
//# sourceMappingURL=limitChunkCount.js.map