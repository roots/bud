import type { Bud } from './types';
/**
 * ## bud.glob
 *
 * Compile assets into a particular directory.
 *
 * ```js
 * bud.bundlePath(
 *  bud.dist('scripts'),
 *  [bud.src('scripts')],
 * )
 * ```
 */
declare const glob: (this: Bud, output: string, files: string) => Bud;
export { glob };
//# sourceMappingURL=glob.d.ts.map