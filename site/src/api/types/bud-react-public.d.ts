/**
 * Add React to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @example
 * JavaScript:
 *
 * ```js
 * module exports = bud => {
 *  bud.use(require('@roots/bud-react'));
 * }
 * ```
 *
 * @example
 * Typescript:
 *
 * ```ts
 * import type {Bud} from '@roots/bud
 * import * as ReactExtension from '@roots/bud-react';
 *
 * export default (bud: Bud) => {
 *   bud.use(ReactExtension);
 * }
 * ```
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

export declare const boot: Factory<[Framework], unknown>;

declare const name_2: string;
export { name_2 as name }

export { }
