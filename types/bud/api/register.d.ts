/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 */
declare const register: Register;
export { register };
import type { Bud } from '..';
export declare type Register = (name: string, plugin: any) => Bud;
//# sourceMappingURL=register.d.ts.map