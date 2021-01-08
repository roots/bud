import { Container, Framework, Module } from '@roots/bud-typings';
import Plugin, { Options as PluginOptions } from 'eslint-webpack-plugin';
export declare type When = Module.When;
export declare type Boot = Module.Boot;
export declare type ToggleEslint = (this: Framework, enabled?: boolean) => Framework;
export declare type Options = (bud: Framework) => PluginOptions;
export declare type Make = (opts: Container) => Plugin;
export declare type Api = (bud: Framework) => EslintConfig;
export declare type EslintConfig = {
    enableEslint: ToggleEslint;
    eslintConfig: ConfigureEslint;
};
export declare type ConfigureEslint = (this: Framework, opts: PluginOptions) => Framework;
//# sourceMappingURL=types.d.ts.map