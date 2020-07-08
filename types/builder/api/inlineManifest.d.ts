/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 */
export type inlineManifest = (arg0: {
    enabled: boolean;
    name: string;
}) => {
    bud: import('./../index');
};
/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * @typedef {function({enabled: boolean, name: string}): {bud: import('./../index')}} inlineManifest
 * @example bud.inlineManifest({name: 'runtime'})
 * @example bud.inlineManifest() // defaults: enabled, runtime
 * @param {{enabled: boolean, name: string}} options
 * @param {boolean} enabled
 * @param {string} name
 * @return {import('./../index')} bud
 */
export function inlineManifest({ enabled, name, }: {
    enabled: boolean;
    name: string;
}): import('./../index');
//# sourceMappingURL=inlineManifest.d.ts.map