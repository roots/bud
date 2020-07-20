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
 *
 * @type {Hooks}
 * @property {Hooks.registered} registered
 * @property {Hooks.make} make - make a hook
 * @property {Hooks.getAll} getAll - return all hooks
 * @property {Hooks.on} on - Register hook
 * @property {Hooks.call} call - Call a hook
 */
declare const hooks: Hooks;
export { hooks };
export declare type Hooks = {
    registered: Object;
    make: Function;
    getAll: Function;
    on: (name: string, callback: Function) => void;
    call: (name: string, params: any) => void;
};
