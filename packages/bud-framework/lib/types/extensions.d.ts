import type { Plugin as WebpackPlugin } from 'webpack';
import type { Framework } from './index.d';
declare type ExtensionPropFallback = any;
declare type MakeExtension = () => WebpackPlugin;
declare type ExtensionTransform = (propName?: string, fallback?: ExtensionPropFallback) => void;
export declare type ExtensionController = {
    app: Framework;
    extension: any;
    build: MakeExtension;
    makeExtension: MakeExtension;
    bindExtensionProps: ExtensionTransform;
    ensureExtensionProp: ExtensionTransform;
    setExtensionOptions: ExtensionTransform;
    mergeExtensionOptions: ExtensionTransform;
};
export declare type ExtensionControllerFactory = (app: Framework, extension: any) => ExtensionController;
/**
 * Extension controller.
 *
 * @this {Bud}
 */
declare const extensions: ExtensionControllerFactory;
export { extensions };
//# sourceMappingURL=extensions.d.ts.map