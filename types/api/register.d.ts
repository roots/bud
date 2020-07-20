/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 *
 * @type  {Register}
 * @param {string} name - The plugin name
 * @param {any} plugin  - The plugin object
 */
declare const register: Register;
export { register };
import type { bud } from '../';
export declare type Register = (name: string, plugin: any) => bud;
