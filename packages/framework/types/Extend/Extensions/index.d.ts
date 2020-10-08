/**
 * Boots and handles extension lifecycle concerns.
 */
export declare class Extensions {
    /**
     * The Bud instance.
     * @type {Framework.Bud}
     * @memberof Controller
     */
    bud: Framework.IBud;
    /**
     * Keyed extensions
     * @type {Index<Extension>}
     * @memberof Controller
     */
    extensions: Framework.Index<Framework.Extension>;
    /**
     * Creates an instance of Controller.
     *
     * @param {Bud} bud
     * @memberof Controller
     */
    constructor(bud: Framework.IBud);
    /**
     * Boot an extension.
     *
     * @param {Index<Extension.Factory>} definitions
     * @memberof Controller
     */
    boot(definitions: Framework.Index<Framework.Extension.Factory>): void;
    /**
     * Invokes extension's registration calls, availability permitting.
     *
     * @param {Framework.Extension} extension
     * @param {Index<unknown>} options
     */
    registerIsh(instance: Framework.Extension, registry: string, func: string): void;
    /**
     * Set the options on a booted extensions.
     *
     * @param {string} extension
     * @param {Index<unknown>} options
     */
    setOptions(extension: string, options: Framework.Index<unknown>): void;
    /**
     * Make an extension
     *
     * @note applies only to webpack plugins
     *
     * @returns {Extension.Product[]}
     */
    make(): Framework.Extension.Product[];
}
//# sourceMappingURL=index.d.ts.map