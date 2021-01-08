import { DefinePlugin } from 'webpack';
import type { Module } from '@roots/bud-typings';
export declare const make: Module.Make<DefinePlugin, PluginOptions>;
export declare const when: Module.When;
export declare const options: Module.Options<PluginOptions>;
export declare type PluginOptions = {
    [key: string]: DefinePlugin['definitions'];
};
//# sourceMappingURL=define.d.ts.map