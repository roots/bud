declare class Bud implements Framework.Bud {
    /**
     * @note I'm not sure how to type something this flexible.
     */
    [key: string]: any;
    private static PRIMARY_DISK;
    build: Framework.Build;
    compiler: Framework.Bud['compiler'];
    disks: Framework.Bud['disks'];
    env: Framework.Env;
    extensions: Framework.Bud['extensions'];
    fs: Framework.Bud['fs'];
    hooks: Framework.Bud['hooks'];
    server: Framework.Bud['server'];
    logger: Framework.Bud['logger'];
    mode: Framework.Bud['mode'];
    store: Framework.Bud['store'];
    util: Framework.Bud['util'];
    /**
     * Creates an instance of Bud.
     *
     * @memberof Bud
     */
    constructor();
    /**
     * Initialize class.
     */
    init: Framework.Bud['init'];
    /**
     * Make a new disk virtual disk.
     */
    makeDisk: Framework.Bud['makeDisk'];
    /**
     * Load a disk in place of the current one.
     */
    useDisk: Framework.Bud['useDisk'];
    /**
     * Make a container.
     */
    makeContainer: Framework.Bud['makeContainer'];
}
export { Bud };
//# sourceMappingURL=index.d.ts.map