/**
 * bud.plugins export
 */
export declare const plugins: Plugins;
export declare type Plugins = {
    webpackAdapters: WebpackAdapters;
    pluginController: PluginController;
};
/**
 * bud.plugins typings
 */
import { Bud } from '..';
export { Bud } from '..';
export declare type WebpackAdapter = () => any;
export declare type WebpackAdapters = RegisteredAdapter[];
export declare type RegisteredAdapter = [string, WebpackAdapter];
export interface BudPluginApi {
    setOptions?: Function;
    mergeOptions?: Function;
    make: Function;
    when?: Function;
}
export declare type PluginController = (bud: Bud) => ({
    bud: Bud;
    new: (arg0: string, arg1: object) => PluginController;
    build: () => void;
    bindPluginProps: () => void;
    ensurePluginProp: (arg0: string, arg1: any) => void;
    instantiatePlugin: () => void;
    register: () => void;
    mergePluginOptions: () => void;
    doPluginHook: (hook: string, ...args: any) => void;
});
//# sourceMappingURL=index.d.ts.map