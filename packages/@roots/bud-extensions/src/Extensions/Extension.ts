import {Service} from '@roots/bud-framework'
import {isFunction, lodash as _} from '@roots/bud-support'
import {
  Framework,
  Index,
  Loader,
  Rule,
  Item,
} from '@roots/bud-typings'

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
export default class extends Service {
  /**
   * Register extension
   */
  public register(): this {
    this.makePlugin = this.makePlugin.bind(this)
    this.isPlugin = this.isPlugin.bind(this)
    this.isPluginEnabled = this.isPluginEnabled.bind(this)
    this.setApp = this.setApp.bind(this)
    this.setBuilders = this.setBuilders.bind(this)

    this.has('api') && this.setApp(this.access('api'))
    this.has('register') && this.access('register')

    return this
  }

  /**
   * Boot extension
   */
  public boot(): this {
    this.has('boot') && this.access('boot')

    return this
  }

  /**
   * Make plugin.
   */
  public makePlugin(): Framework.Webpack.Plugin | null {
    if (!this.isPlugin() || !this.isPluginEnabled()) {
      return null
    }

    const options = this.access('options')

    return this.isFunction('make')
      ? this.get('make')(
          options ? this.app.makeContainer(options) : null,
          this.app,
        )
      : this.get('make')
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

    const options: Framework.Container = this.app.makeContainer(
      this.access('options'),
    )

    if (isFunction(when)) {
      return when(this.app, options)
    }

    return when
  }

  /**
   * ## extension.setApi
   */
  protected setApp<T = unknown>(set: Index<T>): void {
    Object.assign(this.app, this.app.access(set))
  }

  /**
   * ## extension.setBuilders
   */
  public setBuilders(): this {
    const builders = ['loaders', 'items', 'rules']

    const registerFn = (str: string) =>
      `set${_.startCase(_.toLower(str))}`

    builders
      // only dealing with registrable fns here
      .filter(name => this.has(registerFn(name)))
      /**
       * If the registration is a fn, we'll call it
       * and be left with the contents.
       */
      .map((name: string) => {
        return [
          name,
          this.access<
            | [string, Item | Rule | Loader]
            | {[key: string]: Item | Loader | Rule}
          >(registerFn(name)),
        ]
      })
      /**
       * Loop through each entry
       */
      .map(([name, obj]: ExtensionProp) => {
        const register = (
          identifier: string,
          [objName, objValue]: [string, Item | Rule | Loader],
        ) =>
          this.app.build.set(
            `${identifier}.${objName}`,
            objValue,
          )

        Array.isArray(obj)
          ? register(name, obj)
          : Object.entries(obj).forEach(([objName, obj]) => {
              register(name, [objName, obj])
            })

        return null
      })

    return this
  }
}

declare type ExtensionProp = [
  string,
  (
    | [string, Item | Rule | Loader]
    | {
        [key: string]: Item | Loader | Rule
      }
  ),
]
