/**
 * CriticalCssWebpackPlugin
 *
 * @packageDocumentation
 */

/// <reference types="node" />

import vinyl from 'vinyl';
import * as Webpack from 'webpack';

/**
 * CriticalCSSWebpackPlugin
 *
 * @public
 */
export declare class CriticalCssWebpackPlugin {
    /**
     * Plugin ident
     *
     * @public
     */
    plugin: {
        name: string;
        stage: number;
    };
    /**
     * Webpack lifecycle events
     *
     * @public
     */
    webpack: {
        compiler: Webpack.Compiler;
        compilation: Webpack.Compilation;
    };
    /**
     * Plugin options
     *
     * @defaultValue {@link INIT_OPTIONS}
     *
     * @internal
     */
    _options: Options;
    /**
     * Accessor: get options
     *
     * @public
     */
    get options(): Options;
    set options(options: Options);
    /**
     * chunks to be written to json
     *
     * @public
     */
    entrypoints: {
        [key: string]: any;
    };
    /**
     * Class constructor
     *
     * @param options - {@link Options}
     *
     * @public
     */
    constructor(options?: Options);
    /**
     * Webpack apply hook
     *
     * @remarks
     * Webpack compiler callback
     *
     * @param compiler - Webpack compiler
     *
     * @public
     * @decorator `@bind`
     */
    apply(compiler: Webpack.Compiler): Promise<void>;
    /**
     * Compilation hook
     *
     * @public
     * @decorator `@bind`
     */
    compilation(compilation: Webpack.Compilation): void;
    /**
     * Process assets
     *
     * @public
     * @decorator `@bind`
     */
    processAssets(assets: Webpack.Compilation['assets'], callback: () => any): Promise<void>;
    /**
     * Critical css from aggregated entrypoint css sources
     *
     * @public
     * @decorator `@bind`
     */
    criticalEntry(entry: string, module: Webpack.Module): Promise<void>;
    /**
     * Get merged css modules
     *
     * @public
     * @decorator `@bind`
     */
    getMergedCssModules(chunk: any): Webpack.Module[];
    /**
     * Returns either the entrypoint name or the entrypoint name with a hash
     *
     * @public
     * @decorator `@bind`
     */
    maybeHashName(module: Webpack.Module, name: string): string;
    /**
     * Generates critical css
     */
    generateCritical(_entry: string, file: string, contents: string): Promise<any>;
    /**
     * Vinyl adapter
     */
    vfile(path: string, contents: string | Buffer): vinyl.BufferFile;
    /**
     * Inline HTML webpack plugin
     */
    htmlInject(css: string): (data: {
        html: string;
    }, cb: (...args: any) => any) => Promise<void>;
}

/**
 * Plugin constructor options
 *
 * @public
 */
export declare interface Options {
    /**
     * Critical CSS options
     *
     * @public
     */
    criticalOptions?: {
        /**
         * Html source string
         *
         * @public
         */
        src?: string;
        /**
         * Html source string
         *
         * @public
         */
        html?: string;
        /**
         * Base directory
         *
         * @public
         */
        base?: string;
        /**
         * Viewport width
         *
         * @public
         */
        width?: number;
        /**
         * Viewport height
         *
         * @public
         */
        height?: number;
        /**
         * Extract critical
         *
         * @public
         */
        extract?: boolean;
        /**
         * Ignore CSS rules
         *
         * @public
         */
        ignore?: {
            atrule: string[];
            rule: RegExp[];
            decl: (node: any, value: any) => boolean;
        };
    };
    /**
     * Extract inlined styles from referenced stylesheets
     *
     * @public
     */
    hash?: boolean;
    /**
     * Replace var with inlined CSS
     *
     * @public
     */
    replace?: string;
}

export { }
