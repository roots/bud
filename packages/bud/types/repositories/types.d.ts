/// <reference types="webpack-dev-server" />
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin/build-types';
import type { Options as BrowserSyncOptions } from 'browser-sync-webpack-plugin';
import type { Container, FileContainer } from '../container';
import type { Bud } from '..';
export type { Bud };
export declare type Directory = string;
export declare type Paths = Container;
export declare type Options = Container;
export declare type BabelConfiguration = {
    plugins: [];
    presets: [];
};
export declare type BrowserSync = BrowserSyncOptions;
export declare type Copy = {
    patterns: any[];
};
export { DependencyExtractionOptions as WordPressDependenciesOptions };
export declare type Dev = any;
export declare type Externals = WebpackConfiguration['externals'];
export declare type PostCssConfiguration = {
    plugins: [];
};
export declare type Target = WebpackConfiguration['target'];
export declare type Typescript = any;
export declare type Vendor = {
    name: string;
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