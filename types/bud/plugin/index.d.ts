/**
 * bud.plugin export
 */
export declare const plugin: Plugin;
export declare type Plugin = {
    webpackAdapters: WebpackAdapters;
    controller: (bud: Bud) => Controller;
};
/**
 * bud.plugin typings
 */
import { Bud } from '..';
export { Bud } from '..';
export declare type WebpackAdapter = () => any;
export declare type WebpackAdapters = RegisteredPlugin[];
export declare type RegisteredPlugin = [string, WebpackAdapter];
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
    initController?: ([string, object,]: RegisteredPlugin) => Controller;
    initPlugin?: () => any;
    buildPlugin?: () => any;
    bindPluginProps?: () => any;
    ensurePluginProp?: (arg0: string, arg1: any) => any;
    setPluginOptions?: () => any;
    mergePluginOptions?: () => any;
    makePlugin?: () => any;
    doPluginHook?: (hook: string, ...args: any) => any;
};
//# sourceMappingURL=index.d.ts.map