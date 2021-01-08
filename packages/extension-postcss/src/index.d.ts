import type { Item, Module } from '@roots/bud-typings';
/**
 * Config methods
 */
export * as api from './api';
/**
 * PostCSS loader
 */
export { setLoader } from './register';
/**
 * PostCSS rulesetuse item
 */
export declare const setItem: Module.Register<Item>;
/**
 * Use PostCSS with css extension.
 */
export declare const boot: Module.Boot;
//# sourceMappingURL=index.d.ts.map