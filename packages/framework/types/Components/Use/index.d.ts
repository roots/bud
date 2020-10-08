import type Bud from '../../Bud';
/**
 * Build Use
 *
 * @description loader implementation
 *
 * @class Use
 * @implements {Build.Use}
 */
declare class Use implements Build.Use {
    /**
     * The Bud instance.
     *
     * @type {Bud}
     * @memberof Use
     */
    bud: Bud;
    /**
     * Ident
     *
     * @type {Build.Use.Property}
     */
    ident?: Build.Use.Property;
    /**
     * Loader
     *
     * @type {Build.Use.Property}
     */
    loader?: Build.Use.Property;
    /**
     * Options
     *
     * @type {Build.Use.Property}
     */
    options?: Build.Use.Property;
    /**
     * Query
     *
     * @type {Build.Use.Property}
     */
    query?: Build.Use.Property;
    /**
     * Creates an instance of Use.
     *
     * @param {Bud} bud
     * @param {Build.Use.Module} rule
     * @memberof Use
     */
    constructor(bud: Bud, rule: Build.Use.Module);
    /**
     * Set the loader definition
     *
     * @param {Build.Use.Module} rule
     * @memberof Use
     */
    set(rule: Build.Use.Module): void;
    /**
     * Get
     *
     * @returns {Build.Use.Module}
     * @memberof Use
     */
    get(): Build.Use.Module;
    /**
     * Make
     *
     * @returns {Build.Use.Product}
     * @memberof Use
     */
    make(): Build.Use.Product;
}
export default Use;
//# sourceMappingURL=index.d.ts.map