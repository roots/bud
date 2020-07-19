import { bud } from '../bud';
interface mapInterface {
    (enabled: boolean): bud;
}
declare type Map = mapInterface;
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
