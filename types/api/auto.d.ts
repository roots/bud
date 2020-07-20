/**
 * ## bud.auto
 *
 * Automatically load modules instead of needing to import them.
 *
 * ```js
 * bud.auto({jquery: ['$', 'window.jQuery']})
 * ```
 */
declare const auto: Auto;
export { auto };
import type { bud } from '../';
export declare type Auto = (options: {
    [key: string]: [string];
}) => bud;
