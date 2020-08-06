/// <reference types="webpack-dev-server" />
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin/build-types';
import type { Options as BrowserSyncOptions } from 'browser-sync-webpack-plugin';
import type { Container, FileContainer } from '../container';
import type { Bud } from '../types';
export type { Bud };
/**
 * Mitch, all together.
 */
export declare type State = {
    configs: Configs;
    features: Features;
    options: Options;
    paths: Paths;
    flags: Flags;
};
export declare type Directory = string;
export declare type Paths = Container;
export declare type Options = Container;
export declare type BabelConfiguration = {
    plugins: [];
    presets: [];
};
export declare type BrowserSync = BrowserSyncOptions;
export declare type Copy = {
    patterns: object[];
};
export { DependencyExtractionOptions as WordPressDependenciesOptions };
export declare type Dev = any;
export declare type Externals = WebpackConfiguration['externals'];
export declare type PostCssConfiguration = {
    plugins: [];
};
export declare type Target = WebpackConfiguration['target'];
export declare type Typescript = Object;
export declare type Vendor = {
    name: String;
};
declare type Features = any;
export type { Features };
declare type Flags = Container;
export type { Flags };
declare type Args = Container;
export type { Args };
declare type Configs = FileContainer;
export type { Configs };
export declare type Environment = any;
//# sourceMappingURL=types.d.ts.map