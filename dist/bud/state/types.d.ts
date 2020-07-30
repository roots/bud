/// <reference types="webpack-dev-server" />
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Options as DependencyExtractionOptions } from '@wordpress/dependency-extraction-webpack-plugin/build-types';
import type { Options as BrowserSyncOptions } from 'browser-sync-webpack-plugin';
import type { Plugins } from './plugins/types';
/**
 * Mitch, all together.
 */
export declare type State = {
    configs: Configs;
    features: Features;
    options: Options;
    paths: Paths;
    plugins: Plugins;
    flags: Flags;
};
/**
 * Plugins
 */
export type { Plugins };
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
    /**
     * Options repository
     */
    repository: {
        [key: string]: any;
    };
    /**
     * Get the value of a option.
     */
    get: (option: string) => any;
    /**
     * Merge new values into an option
     */
    merge: (option: string, value: any) => void;
    /**
     * Set the value of a option.
     */
    set: (option: string, value: any) => void;
    /**
     * Returns true if there is a value set for this option.
     */
    has: (option: string) => boolean;
    /**
     * Returns true if option is equal to the supplied value.
     */
    is: (option: string, value: any) => boolean;
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
declare type FeatureEntry = boolean;
declare type FeatureRepository = {
    [key: string]: FeatureEntry;
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
    repository: FeatureRepository;
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
declare type FlagEntry = any;
declare type FlagRepository = {
    [key: string]: FlagEntry;
};
interface GetFlag {
    (flag: string): any;
}
interface SetFlag {
    (Repository: any): void;
}
interface HasFlag {
    (flag: string): boolean;
}
interface IsFlag {
    (flag: string, value: any): boolean;
}
/**
 * ## bud.state.flags
 */
declare type Flags = {
    /**
     * Flags store
     */
    repository: FlagRepository;
    /**
     * Get the value of a flag.
     */
    get: GetFlag;
    /**
     * Set the value of a flag.
     */
    set: SetFlag;
    /**
     * Check if a flag exists
     */
    has: HasFlag;
    /**
     * Check if flag matches a given value
     */
    is: IsFlag;
};
export type { Flags };
declare type Config = string;
declare type ConfigEntry = {
    [key: string]: Config;
};
/**
 * ## bud.state.configs
 */
declare type Configs = {
    /**
     * Configs store
     */
    repository: ConfigEntry[] | {};
    /**
     * Get the contents of a config file.
     */
    contents: (this: Configs, config: string) => any | null;
    /**
     * Get the value of a config.
     */
    get: (this: Configs, config: string) => any;
    /**
     * Add a config
     */
    add: (this: Configs, name: string, contents: string) => void;
    /**
     * Return true if config file exists
     */
    exists: (this: Configs, file: string) => boolean;
    /**
     * Check if a config exists
     */
    has: (this: Configs, config: string) => boolean;
};
export type { Configs };
/**
 * Env
 */
export declare type Environment = any;
//# sourceMappingURL=types.d.ts.map