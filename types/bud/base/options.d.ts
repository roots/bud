/**
 * Options container.
 */
declare const options: Options;
export { options };
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin/build-types';
import type { Options as BrowserSyncOptions } from 'browser-sync-webpack-plugin';
export declare type Options = {
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
    dependencyManifest: DependencyExtraction;
    vendor: Vendor;
};
export declare type BabelConfiguration = {
    plugins: [];
    presets: [];
};
export declare type BrowserSync = BrowserSyncOptions;
export declare type Copy = {
    patterns: [];
};
export declare type DependencyExtraction = DependencyExtractionOptions;
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
//# sourceMappingURL=options.d.ts.map