/**
 * Bud plugin factory.
 *
 * @param   {bud}      bud
 * @return  {factory}
 */
declare const pluginFactory: BudConstructor;
export { pluginFactory };
import type { bud, BudConstructor } from './..';
export declare type BudPlugin = {
    bud: bud;
    new: (arg0: string, arg1: object) => BudPlugin;
    build: () => void;
    bindPluginProps: () => void;
    ensurePluginProp: (arg0: string, arg1: any) => void;
    instantiatePlugin: () => void;
    register: () => void;
    mergePluginOptions: () => void;
    doPluginHook: (hook: string, ...args: any) => void;
};
