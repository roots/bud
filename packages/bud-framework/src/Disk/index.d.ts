import { FileSystem } from '@roots/filesystem';
import { Service } from '@roots/bud-support';
import type { Framework, Container, Index } from '@roots/bud-typings';
export default class extends FileSystem implements Service<Framework> {
    /**
     * Application reference
     */
    readonly _app: () => Framework;
    /**
     * Constructor
     */
    constructor(items: {
        app: Framework;
        containers?: Index<Container['repository']>;
    });
    /**
     * Register service
     */
    register(): void;
    /**
     * Boot service
     */
    boot(): void;
    /**
     * Application
     */
    get app(): Framework;
    /**
     * Has prop?
     */
    hasProp: (name: string) => boolean;
}
//# sourceMappingURL=index.d.ts.map