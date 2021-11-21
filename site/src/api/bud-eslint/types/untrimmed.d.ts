/**
 * Provides eslint integration for Bud.
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

import { Container } from '@roots/container';
import { default as default_2 } from 'eslint-webpack-plugin';
import { DefaultMethods } from 'signale';
import { Framework } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';
import { Options } from 'eslint-webpack-plugin/declarations/options';
import { Signale } from 'signale';

export declare const make: Maybe<[Container<Options>, Framework, Signale<DefaultMethods>], default_2>;

export declare const mixin: (app: Framework) => Promise<Record<string, any>>;

declare const name_2: string;
export { name_2 as name }

export declare const options: any;

export { }
