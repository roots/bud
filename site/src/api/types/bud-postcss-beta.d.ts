/**
 * Adds PostCSS support to Bud

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import { Factory } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { Index } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';
import { Module } from '@roots/bud-framework';
import { PluginCreator } from 'postcss';

export declare const api: Maybe<[Framework], Index<unknown>> & {
    postcss: PostCssConfig;
};

export declare const boot: Factory<[Framework], unknown>;

export declare interface BudPostCssExtension extends Module {
    name: Module['name'] & '@roots/bud-postcss';
    api: Module['api'] & {
        postcss: PostCssConfig;
    };
    boot: Module['boot'];
}

export declare const BudPostCssExtension: BudPostCssExtension;

declare const name_2: "@roots/bud-postcss";
export { name_2 as name }

export declare interface PostCssConfig {
    /**
     * Registered plugins
     */
    plugins: Registry;
    /**
     * Set a plugin
     */
    setPlugin(name: string, plugin: [PluginCreator<any>, any] | PluginCreator<any>): this;
    /**
     * Set plugins
     */
    setPlugins(plugins: {
        [key: string]: [PluginCreator<any>, any] | PluginCreator<any>;
    }): this;
    /**
     * Set plugin options
     */
    setPluginOptions(plugin: string, options: any): this;
    /**
     * Remove a plugin
     */
    unsetPlugin(plugin: string): this;
}

export declare class PostCssConfig {
    plugins: Registry;
}

declare interface Registry {
    [key: string]: [PluginCreator<any>, any];
}

export { }
