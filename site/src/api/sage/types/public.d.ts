/**
 * This preset configures Bud for use with the Sage starter theme
 *
 * @see https://github.com/roots/bud
 * @see https://github.com/roots/sage
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import { DefaultMethods } from 'signale';
import { Factory } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { Signale } from 'signale';

export declare const boot: Factory<[Framework, Signale<DefaultMethods>], any>;

declare const name_2: string;
export { name_2 as name }

export { }
