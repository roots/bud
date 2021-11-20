/**
 * Webpack plugin which produces an `entrypoints.json` artifact
 * organizing compiled assets by entrypoint and filetype
 *
 * @packageDocumentation
 */

import type * as Webpack from 'webpack';

declare interface Entry {
    [entry: string]: {
        [type: string]: string[];
    };
}

declare interface EntrypointsPlugin {
    name: string;
    assets: Entry;
}

/**
 * Produces `entrypoints.json` artifact with compiled assets broken down
 * by entrypoint and then filetype.
 *
 * @example
 * ```
 * import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'
 *
 * const config = {
 *   plugins: [new EntrypointsWebpackPlugin()]
 * }
 * ```
 *
 * @sealed
 */
export declare class EntrypointsWebpackPlugin implements EntrypointsPlugin {
    /**
     * Plugin compiler ident
     *
     * @public
     */
    protected plugin: {
        name: string;
        stage: number;
    };
    /**
     * Artifact filename
     *
     * @public
     */
    name: string;
    /**
     * Webpack compiler instance
     *
     * @public
     */
    compiler: Webpack.Compiler;
    /**
     * Webpack compilation instance
     *
     * @public
     */
    compilation: Webpack.Compilation;
    /**
     * Project publicPath
     *
     * @public
     */
    publicPath: string;
    /**
     * Collected assets
     *
     * @public
     */
    assets: Entry;
    /**
     * Class constructor
     *
     * @public
     */
    constructor(options?: Options);
    /**
     * Webpack plugin API's `apply` hook
     *
     * @public
     * @decorator `@bind`
     */
    apply(compiler: Webpack.Compiler): void;
    /**
     * Runs through each entrypoint entry and adds to the
     * manifest
     *
     * @decorator `@bind`
     */
    processAssets(): void;
    /**
     * Adds an entry to the manifest
     *
     * @decorator `@bind`
     */
    addToManifest({ entry, file }: {
        entry: any;
        file: any;
    }): void;
    /**
     * Get assets from an entrypoint
     *
     * @decorator `@bind`
     */
    getEntrypointFiles(entry: {
        chunks: Webpack.Chunk[];
    }): string[];
}

declare interface Options {
    name?: string;
    writeToFileEmit?: boolean;
    publicPath?: string;
    outputPath?: string;
}

export { }
