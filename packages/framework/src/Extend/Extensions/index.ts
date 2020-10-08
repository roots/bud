/**
 * Boots and handles extension lifecycle concerns.
 */
export class Extensions {
  /**
   * The Bud instance.
   * @type {Framework.Bud}
   * @memberof Controller
   */
  public bud: Framework.IBud

  /**
   * Keyed extensions
   * @type {Index<Extension>}
   * @memberof Controller
   */
  public extensions: Framework.Index<Framework.Extension> = {}

  /**
   * Creates an instance of Controller.
   *
   * @param {Bud} bud
   * @memberof Controller
   */
  public constructor(bud: Framework.IBud) {
    this.bud = bud

    this.boot = this.boot.bind(this)
    this.make = this.make.bind(this)

    /**
     * @todo this is a not so hot place for this filter.
     * @todo really this filter shouldn't be needed.
     */
    this.bud.hooks.on(
      'build.plugins',
      (plugins: Framework.Extension[]) =>
        plugins.filter((plugin: Framework.Extension) => plugin),
    )
  }

  /**
   * Boot an extension.
   *
   * @param {Index<Extension.Factory>} definitions
   * @memberof Controller
   */
  public boot(
    definitions: Framework.Index<Framework.Extension.Factory>,
  ): void {
    Object.entries(definitions).map(
      ([name, pluginPackage]: [
        string,
        Framework.Extension.Factory,
      ]) => {
        const instance: Framework.Extension =
          typeof pluginPackage == 'function'
            ? pluginPackage(this.bud)
            : pluginPackage

        if (instance.hasOwnProperty('options')) {
          instance.options =
            typeof instance.options == 'function'
              ? instance.options(this.bud)
              : instance.options
        } else {
          instance.options = null
        }

        this.registerIsh(instance, 'loaders', 'registerLoaders')
        this.registerIsh(instance, 'rules', 'registerRules')
        this.registerIsh(instance, 'uses', 'registerUses')

        this.extensions[name] = instance
      },
    )
  }

  /**
   * Invokes extension's registration calls, availability permitting.
   *
   * @param {Framework.Extension} extension
   * @param {Index<unknown>} options
   */
  public registerIsh(
    instance: Framework.Extension,
    registry: string,
    func: string,
  ): void {
    if (!instance.hasOwnProperty(func)) return

    const value =
      typeof instance[func] == 'function'
        ? instance[func](this.bud)
        : instance

    Object.entries(value).forEach(([key, value]) => {
      this.bud.store[registry].set(key, value)
    })
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
   *
   * @returns {Extension.Product[]}
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
