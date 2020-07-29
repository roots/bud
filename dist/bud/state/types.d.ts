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
    watch: any;
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
declare type Entry = boolean;
declare type Repository = {
    [key: string]: Entry;
};
interface Enable {
    (feature: string): void;
}
interface Enabled {
    (feature: string): boolean;
}
interface Disable {
    (feature: string): void;
}
interface Disabled {
    (feature: string): boolean;
}
interface Get {
    (feature: string): boolean;
}
interface Set {
    (Repository: any): void;
}
interface Has {
    (feature: string): boolean;
}
/**
 * ## bud.state.features
 */
declare type Features = {
    /**
     * Feature store
     */
    repository: Repository;
    /**
     * Enable a feature
     */
    enable: Enable;
    /**
     * Boolean check if feature is enabled.
     */
    enabled: Enabled;
    /**
     * Disable a feature
     */
    disable: Disable;
    /**
     * Boolean check if feature is disabled.
     */
    disabled: Disabled;
    /**
     * Get the value of a feature.
     */
    get: Get;
    /**
     * Set the value of a feature.
     */
    set: Set;
    /**
     * Check if a feature exists
     */
    has: Has;
};
export type { Features };
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