/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 */
export type inlineManifest = (arg0: never, arg1: string, arg2: {
    enabled: boolean;
}) => {
    bud: typeof import('./../index');
};
/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * @typedef {function(name: string, {enabled: boolean}): {bud: typeof import('./../index')}} inlineManifest
 * @example bud.inlineManifest({name: 'runtime'})
 * @example bud.inlineManifest() // defaults: enabled, runtime
 * @param {string} name
 * @return {typeof import('./../index')} bud
 */
export function inlineManifest(name?: string): typeof import('./../index');
//# sourceMappingURL=inlineManifest.d.ts.map