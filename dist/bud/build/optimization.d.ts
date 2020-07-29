import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import type { Bud } from './types';
/**
 * Webpack optimization
 * @type {function} optimization
 */
declare const optimization: (bud: Bud) => {
    bud: Bud;
    supports: {
        minify: boolean;
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
                name: any;
                chunks: string;
                priority: number;
            };
        };
    };
    runtimeChunkOptions: {
        name: (entrypoint: any) => string;
    };
    uglifyOptions: any;
    make: () => any;
    /**
     * Executes a callback if a given feature is enabled.
     *
     * @property {Function} whenSupported
     * @parameter {string} bud.state.feature key
     * @parameter {Function} callback
     * @return {void}
     */
    whenSupported: (feature: string, callback: any) => void;
    /**
     * RuntimeChunk (inline manifest) support
     */
    setRuntimeChunk: () => void;
    /**
     * Code splitting.
     */
    setSplitChunks: () => void;
    /**
     * Minimization.
     */
    setMinimizer: () => void;
    /**
     * Uglify (terser is implemented as a webpack plugin)
     */
    uglify: () => UglifyJsPlugin;
    doHook: (name: any, ...params: any) => void;
};
export { optimization };
//# sourceMappingURL=optimization.d.ts.map