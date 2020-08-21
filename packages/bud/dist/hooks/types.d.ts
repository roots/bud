import type { Bud } from '..';
export type { Bud };
export declare type HooksConstructor = (bud: Bud) => Hooks;
/**
 * ## bud.hooks
 */
export declare type Hooks = {
    logger: any;
    /**
     * ## bud.hooks.init
     * @constructor
     */
    init: (any: any) => Hooks;
    /**
     * ## bud.hooks.registered
     *
     * Registered hooks.
     */
    registered: RegisteredHooks;
    /**
     * ## bud.hooks.make
     *
     * Makes a new hook.
     */
    make: (any: any) => any;
    /**
     * ## bud.hooks.getAll
     *
     * Returns an array of all registered hooks.
     */
    entries: () => any[];
    /**
     * ## bud.hooks.on
     *
     * Register a function to be called with a hook.
     */
    on: (name: string, callback: (any: any) => any) => void;
    /**
     * ## bud.hooks.filter
     *
     * Filter values and functions.
     */
    filter: (name: string, value: any) => any;
};
export declare type RegisteredHooks = {
    [name: string]: Hook[];
};
export declare type Hook = {
    fn: () => any;
    fired: boolean;
};
//# sourceMappingURL=types.d.ts.map