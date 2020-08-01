import { optimize } from 'webpack';
declare const limitChunkCount: {
    setOptions: () => {
        maxChunks: any;
    };
    make: () => optimize.LimitChunkCountPlugin;
    when: () => any;
};
export { limitChunkCount };
//# sourceMappingURL=limitChunkCount.d.ts.map