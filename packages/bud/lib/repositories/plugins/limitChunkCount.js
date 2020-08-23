"use strict";
exports.__esModule = true;
exports.limitChunkCount = void 0;
var webpack_1 = require("webpack");
var LimitChunkCountPlugin = webpack_1.optimize.LimitChunkCountPlugin;
var limitChunkCount = function (bud) { return ({
    bud: bud,
    name: 'limit-chunk-count-plugin',
    setOptions: function () {
        var enabled = this.bud.features.enabled('splitting');
        var chunks = this.bud.options.get('splitting').maxChunks;
        if (!enabled) {
            return {
                maxChunks: 1
            };
        }
        if (chunks) {
            return {
                maxChunks: chunks
            };
        }
        return null;
    },
    make: function () {
        return new LimitChunkCountPlugin(this.options);
    },
    when: function () {
        return this.options;
    }
}); };
exports.limitChunkCount = limitChunkCount;
//# sourceMappingURL=limitChunkCount.js.map