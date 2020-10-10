import { Configuration, Compiler as Webpack, ProgressPlugin } from 'webpack';
import Compiler from './Compiler';
/**
 * The Bud webpack compiler.
 */
export default Compiler;
export interface CompilerInterface {
    /**
     * Webpack configuration
     */
    config: Configuration;
    /**
     * Get the compiler configuration object
     */
    getConfig: () => Configuration;
    /**
     * Set the compiler configuration object
     */
    setConfig: (config: Configuration) => void;
    /**
     * Core webpack compiler
     */
    compiler: Webpack;
    /**
     * Create a new compilation instance
     */
    compile: () => void;
    /**
     * Get the compiler configuration object
     */
    getCompiler: () => Webpack;
    /**
     * Runs the compiler.
     */
    run: (callback: Webpack.Handler) => void;
    /**
     * Runs the compiler in watch mode.
     */
    watch: (callback: Webpack.Handler) => Webpack.Watching;
    /**
     * Close and invalidation methods for the watch process
     */
    watching: Webpack.Watching;
    /**
     * Watch mode configuration
     */
    watchOptions: Webpack.WatchOptions;
    /**
     * Apply progress handler and overlay plugins.
     */
    applyPlugins: (handler: ProgressPlugin.Handler) => void;
}
//# sourceMappingURL=index.d.ts.map