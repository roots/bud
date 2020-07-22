/**
 * Bud plugin controller factory.
 *
 * @param   {bud}      bud
 * @return  {BudPluginController}
 */
declare const pluginControllerFactory: Function;
export { pluginControllerFactory };
import type { Bud } from '../..';
export declare type BudPluginController = {
    bud: Bud;
    new: (arg0: string, arg1: object) => BudPluginController;
    build: () => void;
    bindPluginProps: () => void;
    ensurePluginProp: (arg0: string, arg1: any) => void;
    instantiatePlugin: () => void;
    register: () => void;
    mergePluginOptions: () => void;
    doPluginHook: (hook: string, ...args: any) => void;
};
//# sourceMappingURL=budPluginControllerFactory.d.ts.map