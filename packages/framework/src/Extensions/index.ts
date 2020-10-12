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
    this.extensions[name] =
      typeof extension == 'function'
        ? extension(this.bud)
        : extension

    if (this.extensions[name].hasOwnProperty('options')) {
      this.extensions[name].options =
        typeof this.extensions[name].options == 'function'
          ? (this.extensions[name].options as CallableFunction)(
              this.bud,
            )
          : this.extensions[name].options
    } else {
      this.extensions[name].options = {}
    }

    this.extensions[name].hasOwnProperty('registerLoader') &&
      this.bud.components['loaders'].set(
        ...this.extensions[name].registerLoader,
      )
    this.extensions[name].hasOwnProperty('registerLoaders') &&
      Object.entries(
        this.extensions[name].registerLoaders,
      ).map(loader =>
        this.bud.components['loaders'].set(...loader),
      )

    this.extensions[name].hasOwnProperty('registerItem') &&
      this.bud.components['items'].set(
        this.extensions[name].registerItem[0],
        new Item(
          this.bud,
          this.extensions[name].registerItem[1],
        ),
      )
    this.extensions[name].hasOwnProperty('registerItems') &&
      Object.entries(this.extensions[name].registerItems).map(
        ([, item]: [string, Build.Item.Module]) => {
          this.bud.components['items'].set(
            item.ident,
            new Item(this.bud, item),
          )
        },
      )

    this.extensions[name].hasOwnProperty('registerRule') &&
      this.bud.components['rules'].set(
        this.extensions[name].registerRule[0],
        new Rule(
          this.bud,
          this.extensions[name].registerRule[1],
        ),
      )
    this.extensions[name].hasOwnProperty('registerRules') &&
      Object.entries(this.extensions[name].registerRules).map(
        ([, rule]) => {
          this.bud.components['rules'].set(
            name,
            new Rule(this.bud, rule),
          )
        },
      )

    /**
     * Register API
     */
    this.extensions[name].hasOwnProperty('api') &&
      this.bindApi(this.extensions[name].api)
    this.extensions[name].hasOwnProperty('boot') &&
      this.extensions[name].boot(this.bud)
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
          extension.when(this.bud, extension.options)
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
