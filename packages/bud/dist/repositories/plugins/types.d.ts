import type { Bud } from '../../util/types';
export type { Bud };
export declare type WebpackAdapter = () => any;
export declare type CorePlugin = () => any;
export declare type Extension = WebpackAdapter | CorePlugin | object;
export declare type PluginsRepo = Extension[];
import type BrowserSyncPlugin from 'browser-sync-webpack-plugin';
export type { BrowserSyncPlugin };
export type { CleanWebpackPlugin } from 'clean-webpack-plugin';
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
    init?: (repository: any) => any;
    build?: (any: any) => any;
    final?: (any: any) => any;
    bindPluginProps?: () => any;
    ensurePluginProp?: (arg0: string, arg1: any) => any;
    setPluginOptions?: () => any;
    mergePluginOptions?: () => any;
    makePlugin?: () => any;
    doPluginHook?: (hook: string, ...args: any) => any;
};
//# sourceMappingURL=types.d.ts.map