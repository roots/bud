/**
 * Fetch declared dependencies from the wordpress/gutenberg repo
 */
declare const fetchExternals: Packages.Fetch;
export { fetchExternals as default };
export interface Hash {
    [key: string]: any;
}
declare namespace Packages {
    type Fetch = (useElementAsReact?: boolean) => Promise<Hash>;
    type Transform = (hash: Hash) => Hash;
    type Reduce = (accumulated: Hash, current: string) => Hash;
}
//# sourceMappingURL=fetchExternals.d.ts.map