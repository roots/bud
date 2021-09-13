/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds Babel
 * transpilation to {@link @roots/bud-framework# | @roots/bud-framework}.

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import { Factory } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';

export declare const boot: Factory<[Framework], unknown>;

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
    plugins: Registry;
    /**
     * Registered babel presets
     *
     * @public
     */
    presets: Registry;
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
    setPlugin(plugin: Registrable): Config;
    /**
     * Add babel plugins
     *
     * @public
     */
    setPlugins(plugins: Array<Registrable>): Config;
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
    setPreset(preset: Registrable): Config;
    /**
     * Add babel presets
     *
     * @public
     */
    setPresets(presets: Array<NormalizedPlugin | string>): Config;
    /**
     * Set the options for a preset
     *
     * @public
     */
    setPresetOptions(preset: string, options: any): Config;
}

export declare class Config {
    /**
     * @public
     */
    name: string;
    _app: () => Framework;
    plugins: Registry;
    presets: Registry;
    get app(): Framework;
    constructor(app: Framework);
    normalizeEntry(c: Registrable): NormalizedPlugin;
    unsetPreset(preset: string): this;
    unsetPlugin(plugin: string): this;
}

/**
 * Default babel plugins
 *
 * @public
 */
export declare const DEFAULT_PLUGINS: Array<Registrable>;

/**
 * Default babel presets
 *
 * @public
 */
export declare const DEFAULT_PRESETS: Array<Registrable>;

declare const name_2: "@roots/bud-babel";
export { name_2 as name }

declare type NormalizedPlugin = [string, {
    [key: string]: any;
}];

export declare const register: Factory<[Framework], unknown>;

declare type Registrable = string | NormalizedPlugin;

declare interface Registry {
    [key: string]: [string, any];
}

export { }
