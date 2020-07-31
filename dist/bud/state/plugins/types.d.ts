import type { Bud } from '../../util/types';
export type { Bud };
export declare type WebpackAdapter = () => any;
export declare type CorePlugin = () => any;
export declare type Extension = WebpackAdapter | CorePlugin;
export declare type PluginRepoEntry = {
    name: string;
    extension: Extension;
};
export declare type PluginsRepo = PluginRepoEntry[];
/**
 * ## bud.plugins
 *
 * Extend bud with webpack adapters and core plugins.
 */
export declare type Plugins = {
    /**
     * ## bud.plugins.repository
     *
     * Plugins store
     */
    repository: {
        /**
         * ## bud.plugins.repository.adapters
         *
         * Webpack plugin adapters
         */
        adapters: PluginsRepo;
        /**
         * ## bud.plugins.repository.core
         *
         * Core Bud plugins
         */
        core: PluginsRepo;
    };
    /**
     * ## bud.plugins.controller
     *
     * Plugin controller.
     */
    controller: (bud: Bud) => Controller;
    /**
     * ## bud.plugins.getPlugin
     *
     * Get the value of a core plugin.
     */
    getPlugin: (this: Plugins, plugin: string) => any;
    /**
     * ## bud.plugins.setPlugin
     *
     * Set a core plugin.
     */
    setPlugin: (this: Plugins, name: string, plugin: PluginRepoEntry) => void;
    /**
     * ## bud.plugins.deletePlugin
     *
     * Remove a core plugin.
     */
    deletePlugin: (this: Plugins, name: string) => void;
    /**
     * ## bud.plugins.hasPlugin
     *
     * Check if a core plugin exists.
     */
    hasPlugin: (this: Plugins, plugin: string) => boolean;
    /**
     * ## bud.plugins.getAdapter
     *
     * Get the value of a webpack plugin adapter.
     */
    getAdapter: (this: Plugins, plugin: string) => any;
    /**
     * ## bud.plugins.setAdapter
     *
     * Set a webpack plugin adapter
     */
    setAdapter: (this: Plugins, name: string, plugin: PluginRepoEntry) => void;
    /**
     * ## bud.plugins.deleteAdapter
     *
     * Remove a webpack plugin adapter
     */
    deleteAdapter: (this: Plugins, name: string) => void;
    /**
     * ## bud.plugins.hasAdapter
     *
     * Check if a webpack plugin adapter exists
     */
    hasAdapter: (this: Plugins, plugin: string) => boolean;
};
export interface BudPlugin {
    /**
     * Set options
     */
    setOptions?: Function;
    /**
     * Merge options
     */
    mergeOptions?: Function;
    /**
     * Make plugin output.
     */
    make?: Function;
    /**
     * Conditions that need to be met in order to engage plugin functionality.
     */
    when?: Function;
}
export declare type Controller = {
    bud?: Bud;
    plugin?: BudPlugin;
    name?: string;
    initController?: ({ name: string, extension: Plugin, }: PluginRepoEntry) => Controller;
    initPlugin?: () => any;
    buildPlugin?: () => any;
    bindPluginProps?: () => any;
    ensurePluginProp?: (arg0: string, arg1: any) => any;
    setPluginOptions?: () => any;
    mergePluginOptions?: () => any;
    makePlugin?: () => any;
    doPluginHook?: (hook: string, ...args: any) => any;
};
//# sourceMappingURL=types.d.ts.map