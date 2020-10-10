/**
 * Boots and handles extension lifecycle concerns.
 */
export declare class Extensions {
    /**
     * The Bud instance.
     * @type {Framework.Bud}
     */
    bud: Framework.Bud;
    /**
     * Keyed extensions
     * @type {Index<Extension>}
     */
    extensions: Framework.Index<Framework.Extension>;
    /**
     * Creates an instance of Controller.
     *
     * @param {Bud} bud
     */
    constructor(bud: Framework.Bud);
    /**
     * Boot extensions controller.
     * @param {Index<Extension.Factory>} definitions
     */
    boot(extArgument?: Framework.Index<Framework.Extension.Factory>): void;
    /**
     * Register a batch of extensions.
     */
    registerExtensions(extensions: Framework.Index<Framework.Extension.Factory>): void;
    /**
     * Register an extension.
     */
    registerExtension(name: string, extension: unknown): void;
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
     */
    make(): Framework.Extension.Product[];
}
//# sourceMappingURL=index.d.ts.map