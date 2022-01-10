/**
 * The {@link @roots/wordpress-externals-webpack-plugin# | @roots/wordpress-externals-webpack-plugin} externalizes
 * dependencies which should be enqueued through WordPress' API
 *
 * @see https://github.com/roots/bud/tree/stable/packages/wordpress-externals-webpack-plugin
 *
 * @packageDocumentation
 */

import { Compiler } from 'webpack';
import { ExternalsPlugin } from 'webpack';

/**
 * WordPress Externals Webpack Plugin
 *
 * @public
 */
export declare class WordPressExternals {
    /**
     * @public
     */
    name: string;
    /**
     * @public
     */
    stage: number;
    /**
     * @public
     */
    externals: ExternalsPlugin;
    /**
     * @public
     */
    constructor();
    /**
     * @public
     */
    apply(compiler: Compiler): void;
}

export { }
