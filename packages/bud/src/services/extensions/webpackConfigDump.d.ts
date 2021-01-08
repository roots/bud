import { WebpackConfigDumpPlugin } from 'webpack-config-dump-plugin';
import type { Module } from '@roots/bud-typings';
export declare const options: Module.Options<{
    outputPath?: string;
    name?: string;
    depth?: number;
    keepCircularReferences?: boolean;
    showFunctionNames?: boolean;
    includeFalseValues?: boolean;
}>;
export declare const make: Module.Make<WebpackConfigDumpPlugin, PluginOptions>;
export declare const when: Module.When;
export declare type PluginOptions = {
    outputPath?: string;
    name?: string;
    depth?: number;
    keepCircularReferences?: boolean;
    showFunctionNames?: boolean;
    includeFalseValues?: boolean;
};
//# sourceMappingURL=webpackConfigDump.d.ts.map