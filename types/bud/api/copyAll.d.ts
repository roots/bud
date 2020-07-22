/**
 * ## bud.copyAll
 *
 * Copy all files from a specified source to a specified destination.
 *
 * ```js
 * bud.copyAll(bud.src('images'), bud.dist('images'))
 * ```
 */
declare const copyAll: (from: string, to: any) => Bud;
export { copyAll };
import type { Bud } from '..';
export declare type CopyAll = (from: string, to: string) => Bud;
//# sourceMappingURL=copyAll.d.ts.map