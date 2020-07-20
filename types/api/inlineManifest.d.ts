/**
 * Inline commons scripts.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
declare const inlineManifest: InlineManifest;
import type { bud } from '../';
export declare type InlineManifest = (options: {
    name?: string;
}) => bud;
export { inlineManifest };
