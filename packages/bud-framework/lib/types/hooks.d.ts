export declare type RegisteredHooks = {
    [name: string]: Hook[];
};
/**
 * A hook definition
 */
export declare type Hook = {
    fn: () => any;
    value: any;
    fired: boolean;
};
/**
 * Framework hooks
 */
export declare type Hooks = {
    /**
     * Framework logging utility
     */
    logger: any;
    /**
     * Logging
     */
    registered: RegisteredHooks;
    /**
     * Formats a callback as registrable entry.
     */
    make: (any: any) => any;
    /**
     * Returns all registered hooks.
     */
    entries: () => any[];
    /**
     * Sets a callback on a filter event.
     */
    on: (name: string, callback: (any: any) => any) => void;
    /**
     * Calls registered callbacks
     */
    filter: (name: string, value: any) => any;
};
/**
 * Returns a hooks instance with application bindings.
 */
export declare type HooksConstructor = (app: any) => Hooks;
declare const hooks: HooksConstructor;
export { hooks };
//# sourceMappingURL=hooks.d.ts.map