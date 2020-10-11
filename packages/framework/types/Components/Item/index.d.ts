/**
 * Build Item
 */
declare class Item {
    /**
     * The Bud instance.
     *
     * @type {Bud}
     */
    bud: Framework.Bud;
    /**
     * Ident
     */
    ident?: Build.Item['ident'];
    /**
     * Loader
     */
    loader?: Build.Item['loader'];
    /**
     * Options
     */
    options?: Build.Item['options'];
    /**
     * Query
     */
    query?: Build.Item['query'];
    /**
     * Creates an instance of Item.
     */
    constructor(bud: Framework.Bud, module: Build.Item.Module);
    /**
     * Prop map
     */
    propMap(): Framework.Index<[
        Build.Item.Property,
        Framework.Store | Framework.Bud
    ]>;
    /**
     * Set the loader definition
     */
    set: Build.Item['set'];
    /**
     * Get the loader ident
     */
    getIdent: Build.Item['getIdent'];
    /**
     * Set the loader ident
     */
    setIdent: Build.Item['setIdent'];
    /**
     * Get the loader ident
     */
    getOptions: Build.Item['getOptions'];
    /**
     * Set the loader options
     */
    setOptions: Build.Item['setOptions'];
    /**
     * Get the loader ident
     */
    getQuery: Build.Item['getQuery'];
    /**
     * Set the loader query
     */
    setQuery: Build.Item['setQuery'];
    /**
     * Get the loader ident
     */
    getLoader: Build.Item['getLoader'];
    /**
     * Set the loader
     */
    setLoader: Build.Item['setLoader'];
    /**
     * Make
     */
    make: Build.Item['make'];
}
export default Item;
//# sourceMappingURL=index.d.ts.map