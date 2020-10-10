import Item from '../../Components/Item'

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

    if (instance.hasOwnProperty('registerLoader')) {
      typeof instance.registerLoader == 'function'
        ? instance.registerLoader(this.bud)
        : instance.registerLoader
    }

    /**
     * Register item
     */
    if (instance.hasOwnProperty('registerItem')) {
      const item: [string, Build.Item.Module] =
        typeof instance.registerItem == 'function'
          ? instance.registerItem(this.bud)
          : instance.registerItem

      this.bud.components['items'].set(
        item[0],
        new Item(this.bud, item[1]),
      )
    }

    if (instance.hasOwnProperty('registerRule')) {
      typeof instance.registerRule == 'function'
        ? instance.registerRule(this.bud)
        : instance.registerRule
    }

    instance.hasOwnProperty('boot') && instance.boot(this.bud)

    this.extensions[name] = instance
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
