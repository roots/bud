/**
 * ## bud.hooks
 *
 * Register callback.
 *
 * ```js
 * bud.hooks.on('hookName', function(value) {
 *   doSomething(value)
 * })}
 * ```
 *
 * Invoke registered callback(s)
 *
 * ```js
 * bud.hooks.call('hookName', value)
 * ```
 */
declare const hooks: Hooks;
export { hooks };
/**
 * Hooks object
 * @typedef {Hooks} Hooks
 */
export declare type Hooks = {
    registered: Object;
    make: Function;
    getAll: Function;
    on: (name: string, callback: Function) => void;
    call: (name: string, params: any) => void;
};
//# sourceMappingURL=hooks.d.ts.map