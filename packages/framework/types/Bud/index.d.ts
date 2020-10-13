import { FileContainer } from '@roots/filesystem';
export declare class Bud implements Framework.Bud {
    /**
     * @note I'm not sure how to type something this flexible.
     */
    [key: string]: any;
    private static PRIMARY_DISK;
    build: Framework.Build;
    compiler: Framework.Bud['compiler'];
    disk: Framework.Bud['disk'];
    env: Framework.Env;
    fs: FileContainer;
    extensions: Framework.Bud['extensions'];
    features: Framework.Features;
    hooks: Framework.Bud['hooks'];
    mode: Framework.Mode;
    server: Framework.Bud['server'];
    logger: Framework.Bud['logger'];
    mode: Framework.Bud['mode'];
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
}
//# sourceMappingURL=index.d.ts.map