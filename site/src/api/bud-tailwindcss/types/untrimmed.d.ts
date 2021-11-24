/**
 * Adds tailwindcss support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @packageDocumentation
 */

import { Framework } from '@roots/bud-framework';
import { TailwindConfig } from 'tailwindcss/tailwind-config';

export declare const api: {
    tailwind: tailwind;
};

export declare const boot: (app: Framework) => void;

declare const name_2: "@roots/bud-tailwindcss";
export { name_2 as name }

/**
 * Configure tailwindcss.
 *
 * @example
 * ```js
 * bud.tailwind('tailwind.config.js')
 * ```
 *
 * ```js
 * bud.tailwind({
 *   theme: {
 *     // etc
 *   }
 * })
 * ```
 *
 * @public
 */
declare function tailwind(config?: TailwindConfig): Framework;

declare interface tailwind {
    (config?: TailwindConfig): Framework;
}

export { }
