/**
 * Inline common scripts.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
declare const inlineManifest: InlineManifest;
import type { Bud } from '..';
export declare type InlineManifest = (options?: {
    name?: string;
}) => Bud;
export { inlineManifest };
//# sourceMappingURL=inlineManifest.d.ts.map