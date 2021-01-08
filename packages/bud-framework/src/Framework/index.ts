import {Container} from '@roots/container'
import {isFunction, isEqual} from '@roots/bud-support'
import {use} from './use'
import {when} from './when'
import Base from './Base'

import {
  Framework,
  Index,
  MaybeCallable,
} from '@roots/bud-typings'

export default abstract class extends Base implements Framework {
  public providers: Framework.Container
  public services: Framework.Container
  public store: Framework.Container

  public use: Framework.Use
  public when: Framework.When

  constructor(providers: Framework.Index<any>) {
    super()

    /**
     * Bindings
     */
    this.bootstrap = this.bootstrap.bind(this)
    this.get = this.get.bind(this)
    this.use = use.bind(this)
    this.when = when.bind(this)
    this.pipe = this.pipe.bind(this)
    this.makeContainer = this.makeContainer.bind(this)
    this.access = this.access.bind(this)
    this.init = this.init.bind(this)
    this.register = this.register.bind(this)
    this.boot = this.boot.bind(this)

    /**
     * Essential containers
     */
    this.store = this.makeContainer()
    this.services = this.makeContainer()
    this.providers = this.makeContainer()

    /**
     * Set providers
     */
    this.providers.setStore({...providers})

    /**
     * This "fixes" resize emitter warnings
     * @todo actually fix this
     */
    // process.setMaxListeners(0)

    /**
     * This fixes issues with SWR thinking its in the browser.
     * @todo does this fix the vue extension issue?
     */
    isEqual(typeof global.navigator, 'undefined') &&
      Object.assign(global, {})
  }

  init(): this {
    this.bootstrap()

    this.register()

    this.boot()

    return this
  }

  bootstrap(): void {
    this.providers
      /**
       * Make stores
       */
      .each('store', (name, store) => {
        this.store.set(name, store)
      })

      /**
       * Make API
       */
      .each('api', (name, fn) => {
        this[name] = fn.bind(this)
      })

    /**
     * Set features from CLI args
     * These need to be set before instantiating services
     */
    this.store.each('args', (name: string, value: any) => {
      this.store.set(`features.${name}`, value)
    })

    /**
     * Instantiate framework services
     */
    this.providers
      .get('services')
      .forEach(([name, Service, dependencies]) => {
        this.services.set(
          name,
          new Service({
            app: this,
            ...dependencies,
          }),
        )

        /**
         * Service getters and setters
         */
        if (this[name]) {
          throw Error(
            `${name} is already registered on ${this.name}`,
          )
        }
        Object.defineProperty(this, name, {
          get() {
            return this.services.get(name)
          },

          set(value) {
            this.services.set(value)
          },
        })
      })
  }

  /**
   * Lifecycle: registration
   */
  register(): void {
    this.services.get('hooks').register()
    this.services.get('build').register()

    this.services.every(name => {
      if (['hooks', 'builders'].includes(name)) return

      Object.keys(this).includes(name) && this[name].register()
    })
  }

  boot(): void {
    this.services.get('hooks').boot()
    this.services.get('build').boot()

    this.services.every(name => {
      if (['hooks', 'builders'].includes(name)) return

      Object.keys(this).includes(name) && this[name].boot()
    })
  }

  get(): this {
    return this
  }

  access<I = unknown>(value: MaybeCallable<I>): I {
    return isFunction(value)
      ? (value as CallableFunction)(this)
      : value
  }

  makeContainer(repository?: Index<any>): Container {
    return new Container(repository ?? {})
  }

  pipe(fns: CallableFunction[]): this {
    fns.reduce((_val, fn) => {
      return fn(this)
    }, this)

    return this
  }
}
