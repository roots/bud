/**
 * Extracts the dependencies from a WordPress plugin or theme which are provided by
 * WordPress' enqueue API. The assets which are extracted are made available in a manifest
 * file which can be read server-side.
 *
 * @packageDocumentation
 */

import Webpack from 'webpack';

declare interface Manifest {
    [key: string]: any;
}

/**
 * @public
 */
export declare class WordPressDependenciesWebpackPlugin {
    /**
     * @public
     */
    plugin: {
        name: string;
        stage: number;
    };
    /**
     * @public
     */
    protected compilation: Webpack.Compilation;
    /**
     * @public
     */
    fileName: string;
    /**
     * @public
     */
    manifest: Manifest;
    /**
     * @public
     */
    usedDependencies: {};
    /**
     * @public
     */
    constructor(options?: {
        fileName: string;
    });
    /**
     * @public
     */
    apply(compiler: Webpack.Compiler): void;
    /**
     * @public
     */
    normalModuleFactory(factory: any): void;
    /**
     * @public
     */
    processAssets(assets: Webpack.Compilation['assets']): void;
}

export { }
