/**
 * ## bud.map
 *
 * Enable or disable source-maps
 *
 * ### Example
 *
 * ```js
 * bud.map(true)
 * ```
 */
declare const map: Map;
export { map };
import type { bud } from '../';
export declare type Map = (enabled: boolean) => bud;
