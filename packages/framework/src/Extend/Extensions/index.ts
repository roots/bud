import Item from '../../Components/Item'
import Rule from '../../Components/Rule'
import {lodash as _} from '@roots/bud-support'

/**
 * Boots and handles extension lifecycle concerns.
 */
export class Extensions {
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

    if (instance.hasOwnProperty('options')) {
      instance.options =
        typeof instance.options == 'function'
          ? instance.options(this.bud)
          : instance.options
    } else {
      instance.options = null
    }

    /**
     * Register loader.
     */
    instance.hasOwnProperty('registerLoader') &&
      this.bud.components['loaders'].set(
        ...instance.registerLoader,
      )
    instance.hasOwnProperty('registerLoaders') &&
      Object.entries(instance.registerLoaders).map(loader =>
        this.bud.components['loaders'].set(...loader),
      )

    /**
     * Register Rule items.
     */
    instance.hasOwnProperty('registerItems') &&
      Object.entries(instance.registerItems).map(
        ([, item]: [string, Build.Item.Module]) => {
          this.bud.components['items'].set(
            item.ident,
            new Item(this.bud, item),
          )
        },
      )

    /**
     * Register rules
     */
    instance.hasOwnProperty('registerRules') &&
      Object.entries(instance.registerRules).map(
        this.registerRule.bind(this),
      )

    /**
     * Register API
     */
    instance.hasOwnProperty('registerConfig') &&
      this.bindConfigurable(instance.registerConfig)

    instance.hasOwnProperty('registerConfigs') &&
      this.bindAllConfigurables(instance.registerConfigs)

    instance.hasOwnProperty('boot') && instance.boot(this.bud)

    this.extensions[name] = instance
  }

  public registerRule = function ([name, rule]) {
    this.bud.components['rules'].set(
      name,
      new Rule(this.bud, rule),
    )
  }

  /**
   * Bind all config API.
   */
  public bindAllConfigurables: Framework.Bud['bindAllConfigurables'] = function (
    methods,
  ) {
    Object.entries(methods).map(
      ([name, fn]: [string, CallableFunction]) => {
        this.bindConfigurable(name, fn.bind(this.bud))
      },
    )
  }

  /**
   * Make a config API method.
   */
  public bindConfigurable: Framework.Bud['bindConfigurable'] = function (
    name,
    callable,
  ) {
    this[name] = callable.bind(this)
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
