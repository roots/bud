import { optimize } from 'webpack';
var LimitChunkCountPlugin = optimize.LimitChunkCountPlugin;
var limitChunkCount = function () { return ({
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
        return this.bud.features.enabled('optimize') && this.options;
    }
}); };
export { limitChunkCount };
//# sourceMappingURL=limitChunkCount.js.map