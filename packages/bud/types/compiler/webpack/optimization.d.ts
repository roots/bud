import type { Bud } from './types';
/**
 * Webpack optimization
 */
declare const optimization: (bud: Bud) => {
    bud: Bud;
    supports: {
        minify: any;
        runtimeChunk: any;
        vendor: any;
    };
    target: {
        optimization: {
            minimize: any;
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
     */
    when: (feature: boolean, callback: any) => void;
    /**
     * RuntimeChunk (inline manifest) support
     */
    doRuntimeChunk: (context: any) => void;
    /**
     * Code splitting.
     */
    doVendor: (context: any) => void;
    /**
     * Minimization.
     */
    doMinimizer: (context: any) => void;
};
export { optimization };
//# sourceMappingURL=optimization.d.ts.map