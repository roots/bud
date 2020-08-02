import type { Bud } from '../types';
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
     * ## bud.hooks.called
     *
     * List of called hooks.
     */
    called: string[];
    /**
     * ## bud.hooks.make
     *
     * Makes a new hook.
     */
    make: Function;
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
    on: (name: string, callback: Function) => void;
    /**
     * ## bud.hooks.call
     *
     * Call functions registered on a hook.
     */
    call: (name: string, params?: any) => void;
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