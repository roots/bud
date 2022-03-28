import {Bootstrapper} from './Bootstrapper'
import {Framework} from './Framework'

/**
 * Atomic unit of {@link Framework} functionality.
 *
 * @remarks
 * The {@link Service} interface extends {@link Bootstrapper}, which provides {@link @roots/container#Container}
 * and {@link Framework} access
 *
 * A {@link Service} is tapped through a series of callbacks at different points in the build.
 *
 * All of the callbacks are optional:
 *
 * - {@link Service.bootstrap} is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
 *
 * - {@link Service.bootstrapped} is called once all Services have been instantiated.
 *
 * - {@link Service.register} is intended for Services to register functionalities, modules, and bind functions and classes.
 *
 * - {@link Service.registered} is called after all {@link Service.register} callbacks are complete.
 *
 * - {@link Service.boot} is called once all services are registered. It should be safe for Services to reference one another.
 *
 * - {@link Service.booted} is called after all {@link Service.boot} callbacks are complete.
 *
 * @typeParam Repository - {@link Repository} typing, if applicable
 *
 * @public
 */
export abstract class Service<
  Repository = Record<string, any>,
> extends Bootstrapper<Repository> {
  /**
   * Service identifier
   *
   * @public
   */
  public ident?: string = 'service'

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @virtual @public
   */
  public bootstrap?(app: Framework): Promise<any>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all {@link Service} instances are available.
   *
   * @param app - {@link Framework}
   *
   * @virtual @public
   */
  public bootstrapped?(app: Framework): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for {@link Service} instances to register functionalities, modules, and bind functions and classes to the {@link Framework}
   *
   * @param app - {@link Framework}
   *
   * @virtual @public
   */
  public register?(app: Framework): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after all {@link Service.register} callbacks are complete.
   *
   * @param app - {@link Framework}
   *
   * @virtual @public
   */
  public registered?(app: Framework): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered. It should be safe for Services to reference one another.
   *
   * @param app - {@link Framework}
   *
   * @virtual @public
   */
  public boot?(app: Framework): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after all {@link Service.boot} callbacks are complete.
   *
   * @param app - {@link Framework}
   *
   * @virtual @public
   */
  public booted?(app: Framework): Promise<any>
}
