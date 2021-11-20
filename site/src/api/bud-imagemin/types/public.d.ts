/**
 * Add image optimization support to Bud projects
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
 * @packageDocumentation @betaDocumentation
 */

import { DefaultMethods } from 'signale';
import { Factory } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { Signale } from 'signale';

export declare const boot: Factory<[Framework, Signale<DefaultMethods>], any>;

export declare const mixin: (app: Framework) => Promise<Record<string, any>>;

declare const name_2: string;
export { name_2 as name }

export declare const register: Factory<[Framework, Signale<DefaultMethods>], any>;

export { }
