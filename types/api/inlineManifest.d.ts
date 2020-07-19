import { bud } from '../bud';
interface inlineManifestInterface {
    (name?: string): bud;
}
declare type InlineManifest = inlineManifestInterface;
/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
declare const inlineManifest: InlineManifest;
export { inlineManifest };
