import type { Bud } from '../../util/types';
export type { Bud };
export declare type WebpackAdapter = () => any;
export declare type CorePlugin = () => any;
export declare type Plugin = WebpackAdapter | CorePlugin;
export declare type PluginRepoEntry = [string, Plugin];
export declare type PluginsRepo = PluginRepoEntry[];
/**
 * ## bud.state.plugins
 */
export declare type Plugins = {
    /**
     * Plugins store
     */
    repository: {
        adapters: PluginsRepo;
        core: PluginsRepo;
    };
    /**
     * Plugin controller.
     */
    controller: (bud: Bud) => Controller;
    indexOfAdapter: (this: Plugins, name: string) => number;
    /**
     * Get the value of a plugin.
     */
    getAdapter: (this: Plugins, plugin: string) => any;
    /**
     * Add a plugin
     */
    addAdapter: (this: Plugins, plugin: PluginRepoEntry) => void;
    /**
     * Set a plugin
     */
    setAdapter: (this: Plugins, name: string, plugin: PluginRepoEntry) => void;
    /**
     * Remove a plugin
     */
    deleteAdapter: (this: Plugins, name: string) => void;
    /**
     * Check if a plugin exists
     */
    hasAdapter: (this: Plugins, plugin: string) => boolean;
};
export interface BudPlugin {
    setOptions?: Function;
    mergeOptions?: Function;
    make?: Function;
    when?: Function;
}
export declare type Controller = {
    bud?: Bud;
    plugin?: BudPlugin;
    name?: string;
    initController?: ([string, object]: PluginRepoEntry) => Controller;
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