import { Module } from '@roots/bud-typings';
import { IgnoreEmitPlugin as Plugin } from 'ignore-emit-webpack-plugin';
export declare const options: PluginOptions;
export declare const make: Module.Make<Plugin, PluginOptions>;
export declare const when: Module.When;
export declare type PluginOptions = {
    ignorePatterns: Plugin['ignorePatterns'];
};
//# sourceMappingURL=ignoreEmit.d.ts.map