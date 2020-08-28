import { Repository } from './container';
import { Loose } from '@roots/bud-typings';
export declare type PluginPropFallback = any;
export declare type PluginTransform = (propName?: string, fallback?: PluginPropFallback) => void;
/**
 * Conditional check determining whether to engage plugin functionality.
 */
export declare type PluginConditional = (this: PluginInterface) => boolean;
/**
 * Plugin method handling options
 */
export declare type PluginOptions = (this: PluginInterface) => any;
/**
 * Constitutes primary plugin action.
 */
export declare type PluginMake = (this: PluginInterface) => any;
export declare interface PluginInterface extends Loose {
    app?: any;
    bud?: any;
    /**
     * Plugin identifier.
     */
    name?: string;
    /**
     * Plugin options.
     */
    options?: Repository;
    /**
     * Set plugin options
     */
    setOptions?: PluginOptions;
    /**
     * Merge plugin options
     */
    mergeOptions?: PluginOptions;
    /**
     * Primary action of plugin.
     */
    make: PluginMake;
    /**
     * Plugin is utilized when true.
     */
    when?: PluginConditional;
}
/**
 * Bud Extension
 */
export declare type Plugin = (any: any) => PluginInterface;
export declare interface PluginRepository {
    [key: string]: Plugin;
}
/**
 * Extension Repository
 */
export declare interface PluginRepositoryDefinition {
    name: string;
    register: PluginRepository;
}
export declare interface PluginControllerInterface {
    use: Plugin;
    build: () => any;
    make: () => any;
    bindProps: PluginTransform;
    setOptions: PluginTransform;
    mergeOptions: PluginTransform;
}
export declare type PluginController = (app: any) => PluginControllerInterface;
declare const pluginController: PluginController;
export { pluginController };
//# sourceMappingURL=pluginControllerFactory.d.ts.map