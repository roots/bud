import { Container } from '@roots/container';
/**
 * Application service base
 */
export declare abstract class Service<T = any> {
    [key: string]: any;
    /**
     * Application reference
     */
    readonly _app: () => T;
    /**
     * Constructor
     */
    constructor(items: {
        [key: string]: any;
        app: T;
        containers?: {
            [key: string]: Container['repository'];
        };
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
     * Application accessor
     */
    get app(): T;
    /**
     * Has prop?
     */
    hasProp: (name: string) => boolean;
}
//# sourceMappingURL=Service.d.ts.map