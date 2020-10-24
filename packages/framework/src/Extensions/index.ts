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
    this.makePlugins = this.makePlugins.bind(this)

    this.processOptions = this.processOptions.bind(this)
    this.processLoaders = this.processLoaders.bind(this)
    this.processRuleItems = this.processRuleItems.bind(this)
    this.processRules = this.processRules.bind(this)
  }

  /**
   * Boot extensions controller.
   * @param {Index<Extension.Factory>} definitions
   */
  public boot(
    extensions?: Framework.Index<Framework.Extension.Factory>,
  ): void {
    if (!extensions) return

    this.registerExtensions(extensions)
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
      ]) => this.register(name, extension),
    )
  }

  /**
   * Register a plugin to be utilized during compilation.
   */
  public use(pkg: string): this {
    const path = require.resolve(pkg)
    this.bud.makeDisk(pkg, this.bud.fs.path.dirname(path), [
      '**/*',
    ])

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const extension = require(path)

    this.register(pkg, extension)

    return this
  }

  /**
   * Register an extension.
   */
  public register(name: string, extension: unknown): this {
    this.extensions[name] =
      typeof extension == 'function'
        ? extension(this.bud)
        : extension

    this.extensions[name].hasOwnProperty('register') &&
      this.extensions[name].register(this.bud)

    this.processOptions(this.extensions[name])
    this.processLoaders(this.extensions[name])
    this.processRuleItems(this.extensions[name])
    this.processRules(this.extensions[name])

    this.extensions[name].hasOwnProperty('api') &&
      this.bindApi(this.extensions[name].api)

    this.extensions[name].hasOwnProperty('boot') &&
      this.extensions[name].boot(this.bud)

    return this
  }

  /**
   * Process options
   */
  public processOptions(extension: Framework.Extension): void {
    if (extension.hasOwnProperty('options')) {
      extension.options =
        typeof extension.options == 'function'
          ? (extension.options as CallableFunction)(this.bud)
          : extension.options
    } else {
      extension.options = {}
    }
  }

  /**
   * Process loaders
   */
  public processLoaders(extension: Framework.Extension): void {
    extension.hasOwnProperty('registerLoader') &&
      this.bud.build.setLoader(...extension.registerLoader)

    extension.hasOwnProperty('registerLoaders') &&
      Object.entries(extension.registerLoaders).map(loader =>
        this.bud.build.setLoader(...loader),
      )
  }

  /**
   * Process rule items.
   */
  public processRuleItems(extension: Framework.Extension): void {
    extension.hasOwnProperty('registerItem') &&
      this.bud.build.setItem(
        extension.registerItem[0],
        extension.registerItem[1],
      )

    extension.hasOwnProperty('registerItems') &&
      Object.entries(extension.registerItems).map(
        ([, item]: [string, Framework.Item.Module]) => {
          const name =
            typeof item.ident == 'function'
              ? item.ident(this.bud)
              : item.ident
          this.bud.build.setItem(name, item)
        },
      )
  }

  /**
   * Process rules.
   */
  public processRules(extension: Framework.Extension): void {
    extension.hasOwnProperty('registerRule') &&
      this.bud.build.setRule(
        extension.registerRule[0],
        extension.registerRule[1],
      )

    extension.hasOwnProperty('registerRules') &&
      Object.entries(extension.registerRules).map(
        ([name, rule]) => {
          this.bud.build.setRule(name, rule)
        },
      )
  }

  /**
   * Bind all config API.
   */
  public bindApi = function (
    methods: Framework.Index<CallableFunction>,
  ): void {
    Object.entries(methods).map(([name, fn]) => {
      this.bud[name] = fn.bind(this.bud)
    })
  }

  /**
   * Get an extension instance.
   */
  public getExtension = function (
    name: string,
  ): Framework.Extension {
    return this.extensions[name]
  }

  /**
   * Get the options on a booted extensions.
   */
  public getOptions(
    extension: string,
  ): Framework.Extension.Options {
    return this.getExtension(extension).options
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
    this.getExtension(extension).options = {
      ...this.getOptions(extension),
      ...options,
    }
  }

  /**
   * Make an extension
   * @note applies only to webpack plugins
   */
  public makePlugins(): Framework.Extension.Product[] {
    const output = Object.values(this.extensions)
      .filter(extension => extension.hasOwnProperty('make'))
      .map(extension => {
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

  /**
   * Return Bud (Fluent helper)
   */
  public next(): Framework.Bud {
    return this.bud
  }
}
