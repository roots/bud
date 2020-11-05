import type {
  Bud,
  Extension,
  Index,
  Webpack,
} from '@roots/bud-typings'

/**
 * Boots and handles extension lifecycle concerns.
 */
export class Extensions implements Framework.Extensions {
  /**
   * The Bud instance.
   * @type {Bud}
   */
  public bud: Bud

  /**
   * Extensions container
   * @type {Framework.Indexed}
   */
  public extensions: Framework.Indexed

  /**
   * Creates an instance of Controller.
   *
   * @param {Bud}
   */
  public constructor(params?: any) {
    this.bud = params.bud

    this.extensions = this.bud.makeContainer({})

    this.boot = this.boot.bind(this)
    this.makePlugins = this.makePlugins.bind(this)
    this.processRules = this.processRules.bind(this)
    this.processOptions = this.processOptions.bind(this)
    this.processLoaders = this.processLoaders.bind(this)
    this.processRuleItems = this.processRuleItems.bind(this)
  }

  /**
   * Boot extensions controller.
   *
   * @param {Index<Extension.Factory>} definitions
   */
  public boot(extensions?: Index<Extension.Factory>): void {
    if (!extensions) return

    this.registerExtensions(extensions)
  }

  /**
   * Register a batch of extensions.
   */
  public registerExtensions(
    extensions: Index<Extension.Factory>,
  ): void {
    Object.entries(
      extensions,
    ).map(([name, extension]: [string, Extension.Factory]) =>
      this.register(name, extension),
    )
  }

  /**
   * Register a plugin to be utilized during compilation.
   */
  public use(pkg: string): this {
    const path = require.resolve(pkg)

    this.bud.disk.set(pkg, {
      baseDir: this.bud.fs.path.dirname(path),
      glob: ['**/*'],
    })

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const extension = require(path)

    this.register(pkg, extension)

    return this
  }

  /**
   * Register an extension.
   */
  public register(name: string, extension: unknown): this {
    this.extensions.set(
      name,
      typeof extension == 'function'
        ? extension(this.bud)
        : extension,
    )

    this.extensions.has(`${name}.register`) &&
      this.extensions.get(`${name}.register`)(this.bud)

    this.extensions.has(`${name}.options`) &&
      this.extensions.set(
        `${name}.options`,
        this.processOptions(this.extensions.get(name)),
      )

    this.extensions.has(`${name}.loaders`) &&
      this.extensions.set(
        `${name}.loaders`,
        this.processLoaders(this.extensions.get(name)),
      )

    this.extensions.has(`${name}.registerItem`) &&
      this.extensions.set(
        `${name}.registerItem`,
        this.processRuleItems(this.extensions.get(name)),
      )

    this.extensions.has(`${name}.rules`) &&
      this.extensions.set(
        `${name}.rules`,
        this.processRules(this.extensions.get(name)),
      )

    this.extensions.has(`${name}.api`) &&
      this.extensions.set(
        `${name}.api`,
        this.bindApi(this.extensions.get(name)),
      )

    this.extensions.has(`${name}.boot`) &&
      this.extensions.get(`${name}.boot`)(this.bud)

    return this
  }

  /**
   * Process options
   */
  public processOptions(extension: Extension): Extension {
    if (extension.hasOwnProperty('options')) {
      extension.options =
        typeof extension.options == 'function'
          ? (extension.options as CallableFunction)(this.bud)
          : extension.options
    } else {
      extension.options = {}
    }

    return extension
  }

  /**
   * Process loaders
   */
  public processLoaders(extension: Extension): Extension {
    extension.hasOwnProperty('registerLoader') &&
      this.bud.build.setLoader(...extension.registerLoader)

    extension.hasOwnProperty('registerLoaders') &&
      Object.entries(extension.registerLoaders).map(loader =>
        this.bud.build.setLoader(...loader),
      )

    return extension
  }

  /**
   * Process rule items.
   */
  public processRuleItems(extension: Extension): Extension {
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

    return extension
  }

  /**
   * Process rules.
   */
  public processRules(extension: Extension): void {
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
    methods: Index<CallableFunction>,
  ): void {
    Object.entries(methods).map(
      ([name, fn]: [string, CallableFunction]) => {
        this.bud[name] = fn.bind(this.bud)
      },
    )
  }

  /**
   * Get an extension instance.
   */
  public getExtension = function (name: string): Extension {
    return this.extensions.get(name)
  }

  /**
   * Get the options on a booted extensions.
   */
  public getOptions(extension: string): Extension.Options {
    return this.extensions.get(`${extension}.options`)
  }

  /**
   * Set the options on a booted extensions.
   *
   * @param {string} extension
   * @param {Index<unknown>} options
   */
  public setOptions(
    extension: string,
    options: Index<unknown>,
  ): void {
    this.extensions.set(`${extension}.options`, {
      ...this.extensions.get(`${extension}.options`),
      ...options,
    })
  }

  public mutateOptions(
    extension: string,
    mutationFn: (any) => any,
  ): void {
    this.setOptions(
      extension,
      mutationFn(this.getOptions(extension)),
    )
  }

  /**
   * Make an extension
   * @note applies only to webpack plugins
   */
  public makePlugins(): Webpack.Plugin[] {
    const output = this.extensions
      .entries()
      .filter(([, extension]) =>
        extension.hasOwnProperty('make'),
      )
      .map(([, extension]) => {
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
  public next(): Bud {
    return this.bud
  }
}
