import Item from '../Components/Item'
import Rule from '../Components/Rule'
import {lodash as _} from '@roots/bud-support'

/**
 * Boots and handles extension lifecycle concerns.
 */
export class Extensions implements Framework.Extensions {
  /**
   * The Bud instance.
   * @type {Framework.Bud}
   */
  public bud: Framework.Bud

  /**
   * Keyed extensions
   * @type {Index<Extension>}
   */
  public extensions: Framework.Index<Framework.Extension> = {}

  /**
   * Creates an instance of Controller.
   *
   * @param {Bud} bud
   */
  public constructor(bud: Framework.Bud) {
    this.bud = bud

    this.boot = this.boot.bind(this)
    this.make = this.make.bind(this)
  }

  /**
   * Boot extensions controller.
   * @param {Index<Extension.Factory>} definitions
   */
  public boot(
    extArgument?: Framework.Index<Framework.Extension.Factory>,
  ): void {
    if (!extArgument) return

    this.registerExtensions(extArgument)
  }

  /**
   * Register a batch of extensions.
   */
  public registerExtensions(
    extensions: Framework.Index<Framework.Extension.Factory>,
  ): void {
    Object.entries(
      extensions,
    ).map(
      ([name, extension]: [
        string,
        Framework.Extension.Factory,
      ]) => this.registerExtension(name, extension),
    )
  }

  /**
   * Register an extension.
   */
  public registerExtension(
    name: string,
    extension: unknown,
  ): void {
    const instance =
      typeof extension == 'function'
        ? extension(this.bud)
        : extension

    this.extensions[name] = instance

    if (instance.hasOwnProperty('options')) {
      instance.options =
        typeof instance.options == 'function'
          ? instance.options(this.bud)
          : instance.options
    }

    instance.hasOwnProperty('registerLoader') &&
      this.bud.components['loaders'].set(
        ...instance.registerLoader,
      )
    instance.hasOwnProperty('registerLoaders') &&
      Object.entries(instance.registerLoaders).map(loader =>
        this.bud.components['loaders'].set(...loader),
      )

    instance.hasOwnProperty('registerItem') &&
      this.bud.components['items'].set(
        instance.registerItem[0],
        new Item(this.bud, instance.registerItem[1]),
      )
    instance.hasOwnProperty('registerItems') &&
      Object.entries(instance.registerItems).map(
        ([, item]: [string, Build.Item.Module]) => {
          this.bud.components['items'].set(
            item.ident,
            new Item(this.bud, item),
          )
        },
      )

    instance.hasOwnProperty('registerRule') &&
      this.bud.components['rules'].set(
        instance.registerRule.take(),
        new Rule(this.bud, instance.registerRule.take()),
      )
    instance.hasOwnProperty('registerRules') &&
      Object.entries(instance.registerRules).map(([, rule]) => {
        this.bud.components['rules'].set(
          name,
          new Rule(this.bud, rule),
        )
      })

    /**
     * Register API
     */
    instance.hasOwnProperty('api') && this.bindApi(instance.api)
    instance.hasOwnProperty('boot') && instance.boot(this.bud)
  }

  /**
   * Bind all config API.
   */
  public bindApi = function (methods) {
    Object.entries(methods).map(
      ([name, fn]: [string, CallableFunction]) => {
        this.bud[name] = fn.bind(this.bud)
      },
    )
  }

  /**
   * Get the options on a booted extensions.
   */
  public getOptions(
    extension: string,
  ): Framework.Extension.Options {
    return this.extensions[extension].options
  }

  /**
   * Set the options on a booted extensions.
   *
   * @param {string} extension
   * @param {Index<unknown>} options
   */
  public setOptions(
    extension: string,
    options: Framework.Index<unknown>,
  ): void {
    this.extensions[extension].options = options
  }

  /**
   * Make an extension
   *
   * @note applies only to webpack plugins
   */
  public make(): Framework.Extension.Product[] {
    const output = Object.values(this.extensions)
      .map(extension => {
        if (!extension.make) return

        if (
          !extension.when ||
          extension.when == true ||
          extension.when(this.bud)
        ) {
          return typeof extension.make === 'function'
            ? extension.make(extension.options)
            : extension.make
        }
      })
      .filter(ext => ext)

    return output
  }
}
