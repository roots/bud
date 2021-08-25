import { Container } from '@roots/container';
import type { Framework } from './';
/**
 * Provides container functionality and access to {@link Framework} instance.
 *
 * @public
 */
declare abstract class Bootstrapper<T = any> extends Container<T> {
    /**
     * Service identifier
     * @virtual
     */
    name: any;
    /** @hidden */
    private _app;
    /**
     * Access {@link Framework Framework} instance
     *
     * @readonly
     */
    get app(): Framework;
    /**
     * Container repository
     */
    repository: T & Framework.Index;
    /**
     * Class constructor
     */
    constructor(app: Framework);
}
export { Bootstrapper };
//# sourceMappingURL=Bootstrapper.d.ts.map