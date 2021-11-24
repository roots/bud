/**
 * Add stylelint support to Bud
 *
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
 * @packageDocumentation
 */

/// <reference types="stylelint" />

import { Container } from '@roots/container';
import { DefaultMethods } from 'signale';
import { Framework } from '@roots/bud-framework';
import { LinterOptions } from 'stylelint';
import { Maybe } from '@roots/bud-framework';
import { PluginOptions } from 'stylelint-webpack-plugin/declarations/options';
import { Signale } from 'signale';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';

export declare const make: Maybe<[Container<Partial<PluginOptions & LinterOptions>>, Framework, Signale<DefaultMethods>], StylelintWebpackPlugin>;

declare const name_2: string;
export { name_2 as name }

export declare const options: any;

export { }
