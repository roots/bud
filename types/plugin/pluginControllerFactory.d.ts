/**
 * Bud plugin controller factory.
 *
 * @param   {bud}      bud
 * @return  {BudPluginController}
 */
declare const pluginControllerFactory: BudConstructor;
export { pluginControllerFactory };
import type { bud, BudConstructor } from './..';
export declare type BudPluginController = {
    bud: bud;
    new: (arg0: string, arg1: object) => BudPluginController;
    build: () => void;
    bindPluginProps: () => void;
    ensurePluginProp: (arg0: string, arg1: any) => void;
    instantiatePlugin: () => void;
    register: () => void;
    mergePluginOptions: () => void;
    doPluginHook: (hook: string, ...args: any) => void;
};
