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
export interface MapInterface {
    enabled: boolean;
}
export declare type Map = (MapInterface: any) => bud;
