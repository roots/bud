/**
 * Extracts the dependencies from a WordPress plugin or theme which are provided by
 * WordPress' enqueue API. The assets which are extracted are made available in a manifest
 * file which can be read server-side.
 *
 * @packageDocumentation
 */

import Webpack from 'webpack';

declare namespace WordPressDependencies {
    interface Manifest {
        [key: string]: any;
    }
    interface Options {
        fileName: string;
    }
}

export declare class WordPressDependenciesWebpackPlugin {
    plugin: {
        name: string;
        stage: number;
    };
    protected compilation: Webpack.Compilation;
    fileName: string;
    manifest: WordPressDependencies.Manifest;
    usedDependencies: {};
    constructor(options?: {
        fileName: string;
    });
    apply(compiler: Webpack.Compiler): void;
    normalModuleFactory(factory: any): void;
    processAssets(assets: Webpack.Compilation['assets']): void;
}

export { }
