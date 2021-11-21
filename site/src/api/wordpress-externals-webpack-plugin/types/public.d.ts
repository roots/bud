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

export declare class WordPressExternals {
    name: string;
    stage: number;
    externals: ExternalsPlugin;
    constructor();
    apply(compiler: Compiler): void;
}

export { }
