/// <reference types="webpack-dev-server" />
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin/build-types';
import type { Options as BrowserSyncOptions } from 'browser-sync-webpack-plugin';
import type { TerserPluginOptions as TerserOptions } from 'terser-webpack-plugin';
/**
 * Mitch, all together.
 */
export declare type State = {
    configs: Configs;
    features: Features;
    options: Options;
    paths: Paths;
    plugins: any;
};
/**
 * Paths
 */
export declare type Directory = string;
export declare type Paths = {
    project: Directory;
    framework: Directory;
    src: Directory;
    dist: Directory;
    public: Directory;
};
/**
 * Options
 */
export declare type Options = {
    alias: any;
    auto: any;
    babel: BabelConfiguration;
    copy: Copy;
    dev: any;
    devWatch: any;
    devtool: any;
    entry: any;
    env: any;
    inlineManifest: any;
    node: any;
    splitting: any;
    uglify: any;
    browserSync: any;
    externals: Externals;
    postCss: PostCssConfiguration;
    target: WebpackConfiguration['target'];
    terser: TerserOptions;
    typescript: Typescript;
    dependencyManifest: DependencyExtractionOptions;
    vendor: Vendor;
};
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
/**
 * Features
 */
export declare type Features = {
    babel: boolean;
    browserSync: boolean;
    css: boolean;
    cssModules: boolean;
    debug: boolean;
    dashboard: boolean;
    dependencyManifest: boolean;
    dump: boolean;
    eslint: boolean;
    hash: boolean;
    hot: boolean;
    inlineManifest: boolean;
    minify: boolean;
    overlay: boolean;
    postCss: boolean;
    scss: boolean;
    scssModules: boolean;
    terser: boolean;
    uglify: boolean;
    purge: boolean;
    sourceMap: boolean;
    splitting: boolean;
    translate: boolean;
    typescript: boolean;
    vendor: boolean;
    watch: boolean;
};
/**
 * Configs
 */
export declare type Configs = {
    babel: string | null;
    eslint: string | null;
    postCss: string | null;
    typescript: string | null;
};
/**
 * Env
 */
export declare type Environment = any;
//# sourceMappingURL=types.d.ts.map