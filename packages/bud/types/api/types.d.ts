import { Bud } from '..';
export { Bud } from '..';
import type { Options as BrowserSyncOptions } from 'browser-sync';
export type { BrowserSyncOptions };
import type { Configuration as WebpackConfiguration, Options as WebpackOptions } from 'webpack';
export type { WebpackConfiguration, WebpackOptions };
import { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin';
export type { DependencyExtractionOptions };
export declare type Alias = (arg0: any) => Bud;
export declare type Auto = (options: {
    [key: string]: string[];
}) => Bud;
export declare type BabelCfg = (options: BabelOptions) => Bud;
export declare type Bundle = (name: string, entries: string[]) => Bud;
export declare type Copy = (from: string, to: string) => Bud;
export declare type Debug = (enabled?: boolean) => any;
export declare type DependencyManifest = (settings?: DependencyExtractionOptions) => Bud;
export declare type Dev = (options: any) => Bud;
export declare type Devtool = (devtool: WebpackOptions.Devtool) => Bud;
export declare type Dist = (path?: string) => string;
export declare type Dump = (enabled: boolean) => Bud;
export declare type PathSetter = (path: string) => Bud;
export declare type Glob = (this: Bud, output: string, files: string) => Bud;
export declare type Hash = (this: Bud, enabled?: boolean) => Bud;
export declare type Hot = (this: Bud, options: {
    enabled: boolean;
    host: string;
    port?: number;
    watch?: string[];
    open?: boolean;
    headers?: any;
    secure?: boolean;
}) => Bud;
export declare type InlineManifest = (arg0?: {
    enabled: boolean;
    name: string;
}) => Bud;
export declare type Mini = (enabled?: boolean) => Bud;
export declare type Option = (key: string) => string;
export declare type PostCss = (options?: {
    enabled?: boolean;
    plugins?: any[];
}) => Bud;
export declare type Preset = (path?: string) => any;
export declare type Project = (path?: string) => string;
export declare type Resolve = (moduleName: string) => string;
export declare type SourceMap = (enabled?: boolean) => Bud;
export declare type Splitting = (enabled?: boolean) => Bud;
export declare type Src = (path?: string) => string;
export declare type Sync = (options: SyncOptions) => Bud;
export declare type Target = (target: string) => Bud;
export declare type Terser = (options: {
    enable?: boolean;
    terser?: any;
}) => Bud;
export declare type Watch = (options: {
    paths: string[];
    enabled: boolean;
}) => Bud;
import type { Use } from './use';
export type { Use };
import type { Vendor } from './vendor';
export type { Vendor };
export declare type Api = {
    alias: Alias;
    auto: Auto;
    babel: BabelCfg;
    bundle: Bundle;
    compile: () => void;
    config: any;
    copy: Copy;
    copyAll: Copy;
    dev: Dev;
    devtool: Devtool;
    dist: Dist;
    distPath: PathSetter;
    glob: Glob;
    hash: Hash;
    hot: Hot;
    project: Project;
    publicPath: PathSetter;
    splitting: Splitting;
    terser: Terser;
    inlineManifest: InlineManifest;
    map: SourceMap;
    mini: Mini;
    postCss: PostCss;
    preset: Preset;
    projectPath: PathSetter;
    src: Src;
    srcPath: PathSetter;
    sync: Sync;
    target: Target;
    use: Use;
    vendor: Vendor;
    watch: Watch;
};
import { TransformOptions as BabelOptions } from '@babel/core';
export { BabelOptions };
export interface SyncOptions {
    enabled?: boolean;
    options: BrowserSyncOptions;
}
//# sourceMappingURL=types.d.ts.map