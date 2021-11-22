/**
 * Adds TypeScript support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @remarks
 * You should absolutely use this extension
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import { Factory } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { Index } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';

export declare const api: Maybe<[Framework], Index<unknown>>;

export declare const boot: Factory<[Framework], unknown>;

declare const name_2: string;
export { name_2 as name }

export { }
