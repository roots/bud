import {
  Framework,
  Index,
  Loader,
  Rule,
  Item,
  MaybeCallable,
} from '@roots/bud-typings'

import {
  ServiceContainer,
  isArray,
  isFunction,
} from '@roots/bud-support'

declare type Registrable = Item | Rule | Loader

declare type RegistrableObject = {
  [key: string]: Loader | Item | Rule
}

declare type RegistrableSource =
  | RegistrableTuple[]
  | RegistrableTuple
  | RegistrableObject

declare type RegistrableTuple = [string, Registrable]

declare type RegistrationFn = (
  name: string,
  registrable: Registrable,
) => Registrable

declare type Builders = [string, RegistrationFn][]

/**
 * Extensions controller class.
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export default class extends ServiceContainer<Framework> {
  /**
   * Registration functions
   */
  public builders: Builders = [
    ['setLoaders', this.app.build.setLoader.bind(this)],
    ['setItems', this.app.build.setItem.bind(this)],
    ['setRules', this.app.build.setRule.bind(this)],
  ]

  /**
   * Initialize extension.
   */
  public init(): this {
    this.make = this.make.bind(this)
    this.isPlugin = this.isPlugin.bind(this)
    this.isPluginEnabled = this.isPluginEnabled.bind(this)
    this.setApp = this.setApp.bind(this)
    this.setBuilders = this.setBuilders.bind(this)

    this.setStore(this.extension)

    this.setBuilders()

    this.get('api') && this.setApp<Framework.Api>(this.api)

    this.get('register') && this.get('register')(this.app)

    this.has('boot') &&
      this.set('boot', this.app.access(this.get('boot')))

    return this
  }

  /**
   * Make plugin.
   */
  public make(): Framework.Webpack.Plugin {
    if (!this.isPlugin() || !this.isPluginEnabled()) {
      return null
    }

    const make = this.app.access(this.get('make'))
    const options = this.app.access(this.get('options'))

    return make(options, this.app)
  }

  /**
   * Is this extension a plugin?
   */
  public isPlugin(): boolean {
    return this.has('make')
  }

  /**
   * Is plugin enabled?
   */
  public isPluginEnabled(): boolean {
    if (!this.has('when')) return true

    const when = this.get('when')
    const options = this.app.makeContainer(this.get('options'))

    if (isFunction(when)) {
      return when(this.app, options)
    }

    return when
  }

  /**
   * ## extension.setApi
   */
  protected setApp<T = unknown>(set: Index<T>): void {
    Object.defineProperties(this.app, this.app.access(set))
  }

  /**
   * ## extension.setBuilders
   */
  protected setBuilders(): void {
    this.builders
      // only dealing with registrable fns here
      .filter(([name]) => this.get(name))
      // loop through the fns as there maybe multiple matches
      .map(([name, handler]: [string, RegistrationFn]) => {
        /**
         * If the registration is a fn, we'll call it
         * and be left with the contents.
         */
        const registrable: RegistrableSource = this.app.access(
          this.get(name),
        )

        /**
         * Register array of tuple definitions
         */
        const registerTuples = (
          registrationFn: RegistrationFn,
          tuples: RegistrableTuple[],
        ): void => {
          tuples.forEach(tuple => {
            registrationFn(...tuple)
          })
        }

        /**
         * Duck: Arrays are exclusive to tuple definition
         */
        if (Array.isArray(registrable)) {
          /**
           * A single tuple will have an ident as the first field
           */
          if (typeof registrable[0] == 'string') {
            const single = registrable as RegistrableTuple
            return registerTuples(handler, [single])
          }

          /**
           * The rest are multidimensional tuple definitions
           */
          const many = registrable as RegistrableTuple[]
          return registerTuples(handler, many)
        }

        /**
         * Anything that isn't an array must be an object
         */
        if (!isArray(registrable)) {
          const asObject = registrable as MaybeCallable<
            RegistrableObject
          >

          return registerTuples(
            handler,
            Object.entries(
              this.app.access<RegistrableObject>(asObject),
            ),
          )
        }

        return null
      })
  }
}
