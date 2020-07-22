import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
/**
 * Webpack optimization
 * @type {function} optimization
 */
declare const optimization: (bud: Bud) => {
    bud: Bud;
    supports: {
        minification: boolean;
        runtimeChunk: boolean;
        vendor: boolean;
    };
    options: {
        optimization: {
            minimize: boolean;
            removeAvailableModules: boolean;
            removeEmptyChunks: boolean;
            moduleIds: string;
        };
    };
    splitChunksOptions: {
        cacheGroups: {
            vendor: {
                test: RegExp;
                name: String;
                chunks: string;
                priority: number;
            };
        };
    };
    runtimeChunkOptions: {
        name: (entrypoint: any) => string;
    };
    uglifyOptions: Object;
    make: () => void;
    whenSupported: (feature: any, callback: any) => void;
    setRuntimeChunk: () => void;
    setSplitChunks: () => void;
    setMinimizer: () => void;
    uglify: () => UglifyJsPlugin;
    doHook: (name: any, ...params: any) => void;
};
export { optimization };
import type { Bud } from './../bud';
//# sourceMappingURL=optimization.d.ts.map