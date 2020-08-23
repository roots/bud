import type { Bud } from './';
import type { Extension, ExtensionInterface } from './index';
import type { Plugin as WebpackPlugin } from 'webpack';
import { Fab } from './util/fab';
declare type ExtensionPropFallback = Bud | Fab['undefined'] | Fab['true'];
declare type MakeExtension = () => WebpackPlugin;
declare type ExtensionTransform = (propName?: string, fallback?: ExtensionPropFallback) => void;
export declare type ExtensionController = {
    bud: Bud;
    extension: ExtensionInterface;
    build: MakeExtension;
    makeExtension: MakeExtension;
    bindExtensionProps: ExtensionTransform;
    ensureExtensionProp: ExtensionTransform;
    setExtensionOptions: ExtensionTransform;
    mergeExtensionOptions: ExtensionTransform;
};
export declare type ExtensionControllerFactory = (bud: Bud, extension: Extension) => ExtensionController;
/**
 * Extension controller.
 *
 * @this {Bud}
 */
declare const extensionFactory: ExtensionControllerFactory;
export { extensionFactory };
//# sourceMappingURL=extensionFactory.d.ts.map