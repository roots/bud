/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds [Babel transpiler](https://github.com/babel/babel)
 * support to {@link @roots/bud# | @roots/bud}.
 *
 * - [Babel](https://babeljs.io/) is a JavaScript compiler that can transpile ES2015+ code to ES5.
 *
 * - This extensions comes with a set of preloaded presets and plugins.
 *
 * - You may override the defaults using the {@link Config.setPresets} and {@link Config.setPlugins} methods.
 *
 * - You may also override the default options for a plugin or preset using the {@link Config.setPluginOptions} and {@link Config.setPresetOptions} methods.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @public @extension @packageDocumentation
 */

import type { Framework } from '@roots/bud-framework';
import { Module } from '@roots/bud-framework/types/Module';

export declare const boot: Module.Boot;

/**
 * Configure Babel transpiler plugin & presets
 *
 * @example
 * ```js
 * app.babel.setPlugins([
 *  ['@babel/plugin-transform-runtime', {helpers: false}],
 *  '@babel/plugin-proposal-object-rest-spread',
 *  '@babel/plugin-syntax-dynamic-import',
 *  '@babel/plugin-proposal-class-properties',
 * ])
 * ```
 *
 * @public @extension @config
 */
export declare interface Config {
    /**
     * Registered babel plugins
     *
     * @public
     */
    plugins: Config.Registry;
    /**
     * Registered babel presets
     *
     * @public
     */
    presets: Config.Registry;
    /**
     * Add a babel plugin
     *
     * @example
     * ```js
     * babel.setPlugin(MyPlugin, {plugin: 'options'})
     * ```
     *
     * @public
     */
    setPlugin(plugin: Config.Registrable): Config;
    /**
     * Add babel plugins
     *
     * @public
     */
    setPlugins(plugins: Array<Config.Registrable>): Config;
    /**
     * Set the options for a plugin
     *
     * @public
     */
    setPluginOptions(plugin: string, options: any): Config;
    /**
     * Add a babel preset
     *
     * @example
     * ```js
     * babel.setPlugin(MyPlugin, {plugin: 'options'})
     * ```
     *
     * @public
     */
    setPreset(preset: Config.Registrable): Config;
    /**
     * Add babel presets
     *
     * @public
     */
    setPresets(presets: Array<Config.NormalizedPlugin | string>): Config;
    /**
     * Set the options for a preset
     *
     * @public
     */
    setPresetOptions(preset: string, options: any): Config;
}

export declare namespace Config {
    export type Options = {
        plugins?: Plugin[];
        config?: boolean | string;
    };
    export type NormalizedPlugin = [string, {
        [key: string]: any;
    }];
    export type Plugin = string | NormalizedPlugin | CallableFunction;
    export type Registrable = string | NormalizedPlugin;
    export interface Registry {
        [key: string]: [string, any];
    }
}

export declare class Config {
    name: string;
    _app: () => Framework;
    plugins: Config.Registry;
    presets: Config.Registry;
    get app(): Framework;
    constructor(app: Framework);
    normalizeEntry(c: Config.Registrable): Config.NormalizedPlugin;
    unsetPreset(preset: string): this;
    unsetPlugin(plugin: string): this;
}

/**
 * Default babel plugins
 *
 * @public
 */
export declare const DEFAULT_PLUGINS: Array<Config.Registrable>;

/**
 * Default babel presets
 *
 * @public
 */
export declare const DEFAULT_PRESETS: Array<Config.Registrable>;

declare const name_2: "@roots/bud-babel";
export { name_2 as name }

export declare const register: Module.Register;

export { }
