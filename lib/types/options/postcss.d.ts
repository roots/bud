import { AcceptedPlugin, SourceMapOptions, Syntax, Parser, Stringifier } from 'postcss';
/**
 * The postcss options store
 */
export declare const postcss: PostCssOptionsInterface;
/**
 * Typings for options to expose to API (keyed)
 */
export declare interface PostCssOptionsInterface extends PostCssOptionStoreBase {
    readonly all: PostcssOptions;
    plugins: PluginStore;
}
/**
 * Common between the store and postcss-loader types
 */
export declare interface PostCssOptionStoreBase {
    sourceMapOptions: SourceMapOptions;
    syntax: Syntax;
    parser: Parser;
    stringifier: Stringifier;
}
/**
 * Typings for options to pass to loader (arrayed tuples)
 */
export declare interface PostcssOptions extends PostCssOptionStoreBase {
    plugins: PluginTuple[];
}
/**
 * PostCSS loader plugin type
 */
export declare type PluginTuple = [AcceptedPlugin, unknown];
/**
 * The store plugin type
 */
export declare type PostCssPluginStoreValue = {
    [key: string]: PluginTuple;
};
/**
 * Can be one or more.
 */
export declare type PluginStore = PostCssPluginStoreValue | PostCssPluginStoreValue[];
