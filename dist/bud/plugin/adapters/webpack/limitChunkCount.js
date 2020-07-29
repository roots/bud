"use strict";
exports.__esModule = true;
exports.limitChunkCount = void 0;
var webpack_1 = require("webpack");
var LimitChunkCountPlugin = webpack_1.optimize.LimitChunkCountPlugin;
var limitChunkCount = function () { return ({
    setOptions: function () {
        var enabled = this.bud.state.features.splitting;
        var chunks = this.bud.state.options.splitting.maxChunks;
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
        return this.bud.features.enabled('optimize') && this.options;
    }
}); };
exports.limitChunkCount = limitChunkCount;
//# sourceMappingURL=limitChunkCount.js.map