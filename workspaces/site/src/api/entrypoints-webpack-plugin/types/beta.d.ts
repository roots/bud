/**
 * Webpack plugin which produces an `entrypoints.json` artifact
 * organizing compiled assets by entrypoint and filetype
 *
 * @packageDocumentation
 */

import type * as Webpack from 'webpack';

/**
 * Entrypoints
 *
 * @public
 */
export declare interface Entry extends Record<string, unknown> {
    [entry: string]: {
        [type: string]: string[];
    };
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
 * @public
 */
export declare class EntrypointsWebpackPlugin {
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
     * Entrypoints type.
     *
     * Object type will key files by chunk name
     *
     * @public
     */
    type: 'array' | 'object';
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
     * Emit html
     *
     * @public
     */
    emitHtml: boolean;
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
     * @public
     * @decorator `@bind`
     */
    processAssets(): void;
    /**
     * Adds an entry to the manifest
     *
     * @public
     * @decorator `@bind`
     */
    addToManifest({ key, entry, file }: {
        key?: any;
        entry: any;
        file: any;
    }): void;
    /**
     * Get assets from an entrypoint
     *
     * @public
     * @decorator `@bind`
     */
    getEntrypointFiles(entry: {
        chunks: Webpack.Chunk[];
    }): {
        [key: string]: string;
    }[];
}

/**
 * EntrypointsWebpackPlugin options
 *
 * @public
 */
export declare interface Options {
    /**
     * Name of the file to emit (default: `entrypoints.json`)
     */
    name?: string;
    /**
     * Emit entrypoints as an array or an object (default: `array`)
     */
    type?: 'array' | 'object';
    /**
     * Override the public path (default is from webpack)
     */
    publicPath?: string;
    /**
     * Path to emit entrypoints.json
     */
    outputPath?: string;
    /**
     * Emit html with inlined runtime, script and style tags
     *
     * @public
     */
    emitHtml?: boolean;
}

export { }
