import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin/build-types';
import type { Options as BrowserSyncOptions } from 'browser-sync-webpack-plugin';
/**
 * Mitch, all together.
 */
export declare type State = {
    configs: Configs;
    features: Features;
    options: Options;
    paths: Paths;
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
    devtool: any;
    entry: any;
    env: any;
    inlineManifest: Object;
    splitting: Object;
    uglify: Object;
    browserSync: Object;
    externals: Externals;
    postCss: PostCssConfiguration;
    svg: Svg;
    target: WebpackConfiguration['target'];
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
export declare type Svg = any;
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
    debug: boolean;
    dashboard: boolean;
    dependencyManifest: boolean;
    dump: boolean;
    eslint: boolean;
    hash: boolean;
    hot: boolean;
    inlineManifest: boolean;
    minified: boolean;
    overlay: boolean;
    postCss: boolean;
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