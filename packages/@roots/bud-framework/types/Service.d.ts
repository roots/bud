import type { Class } from 'type-fest';
import { Bootstrapper } from './Bootstrapper';
import { Framework } from './Framework';
/**
 * Atomic unit of {@link Framework} functionality.
 *
 * @remarks
 * Services extend {@link Bootstrapper}, which provides container functions and access to the main {@link Framework} instance.
 *
 * All services must be defined during instantiation of the {@link Framework}.
 *
 * A Service provides functionality through a series of lifecycle callbacks, which are all optional:
 *
 * - {@link Service.bootstrap bootstrap} is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
 * - {@link Service.bootstrapped bootstrapped} is called once all Services have been instantiated.
 *
 * - {@link Service.register register} is intended for Services to register functionalities, modules, and bind functions and classes.
 * - {@link Service.registered registered} is called after all {@link Service.register} callbacks are complete.
 *
 * - {@link Service.boot boot} is called once all services are registered. It should be safe for Services to reference one another.
 * - {@link Service.booted booted} is called after all {@link Service.boot} callbacks are complete.
 *
 * @typeParam T - Container repository typing, if applicable
 */
declare abstract class Service<T = {
    [key: string]: any;
}> extends Bootstrapper<T> {
    /**
     * Lifecycle method: bootstrap
     *
     * @remarks
     * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
     *
     * @virtual
     */
    bootstrap?(app: Framework): any;
    /**
     * Lifecycle method: bootstrapped
     *
     * @remarks
     * `bootstrapped` is called once all Services have been instantiated.
     *
     * @virtual
     */
    bootstrapped?(app: Framework): any;
    /**
     * Lifecycle method: register
     *
     * @remarks
     * `register` is intended for Services to register functionalities, modules, and bind functions and classes.
     *
     * @virtual
     */
    register?(app: Framework): any;
    /**
     * Lifecycle method: registered
     *
     * @remarks
     * `registered` is called after all {@link Service.register} callbacks are complete.
     *
     * @virtual
     */
    registered?(app: Framework): any;
    /**
     * Lifecycle method: boot
     *
     * @remarks
     * `boot` is called once all services are registered. It should be safe for Services to reference one another.
     *
     * @virtual
     */
    boot?(app: Framework): any;
    /**
     * Lifecycle method: booted
     *
     * @remarks
     * `booted` is called after all {@link Service.boot} callbacks are complete.
     *
     * @virtual
     */
    booted?(app: Framework): any;
    /**
     * Class constructor
     */
    constructor(app: Framework);
    /**
     * Bind a {@link CallableFunction} to the {@link Framework}
     *
     * @example
     * Bind to `app.boundFnName`
     *
     * ```js
     * app.service.bindClass({boundFnName: BindingClass})
     * ```
     *
     * @typeParam T - Object typing
     * @decorator `@bind`
     */
    bindMacro<T = {
        [key: string]: CallableFunction;
    }>(properties: T): void;
    /**
     * Bind a {@link Class} to the {@link Framework}.
     *
     * @remarks
     * Constructor parameters can be specified using an array.
     *
     * @example
     * Bind to `app.bindingName`:
     *
     * ```js
     * app.service.bindClass({bindingName: BindingClass})
     * ```
     *
     * @example
     * Specify constructor parameters to pass to `BindingClass` during instantiation.
     *
     * ```js
     * app.service.bindClass({bindingName: [BindingClass, foo, bar]})
     * ```
     *
     * @typeParam T - Object typing
     * @decorator `@bind`
     */
    bindClass<T = {
        [key: string]: Class<any> | [Class<any>, any[]];
    }>(properties: T): void;
}
export { Service };
//# sourceMappingURL=Service.d.ts.map