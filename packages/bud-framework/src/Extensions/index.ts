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
    const {callMeMaybe} = this.bud

    this.extensions.set(
      name,
      typeof extension == 'function'
        ? extension(this.bud)
        : extension,
    )

    const instance = this.extensions.get(name)
    const hasProp = prop => instance.hasOwnProperty(prop)

    this.bud
      .when(hasProp('register'), () =>
        callMeMaybe(instance.register, this.bud),
      )

      .when(hasProp('options'), bud => {
        const options = callMeMaybe(instance.options, bud)
        options &&
          this.extensions.set(`${name}.options`, options)
      })

      .when(hasProp(`registerLoader`), () => {
        const loader: [string, any] = callMeMaybe(
          instance.registerLoader,
          this.bud,
        )

        this.bud.build.setLoader(...loader)
      })

      .when(hasProp(`registerItem`), bud =>
        bud.build.setItem(
          ...callMeMaybe(instance.registerItem, bud),
        ),
      )

      .when(hasProp(`registerItems`), bud =>
        Object.entries(
          callMeMaybe(instance.registerItems, bud),
        ).map(item => {
          item = callMeMaybe(item, bud)
          bud.build.setItem(...item)
        }),
      )

      .when(hasProp(`registerRule`), () => {
        const rule: [string, any] = callMeMaybe(
          instance.registerRule,
          this.bud,
        )

        rule && this.bud.build.setRule(...rule)
      })

    hasProp(`registerRules`) &&
      Object.entries(
        callMeMaybe(instance.registerRules, this.bud),
      ).map((rule: [string, any]) => {
        rule = callMeMaybe(instance.registerRule, this.bud)
        rule && this.bud.build.setRule(...rule)
      })

    hasProp(`api`) && this.bindApi(instance.api)
    hasProp(`boot`) && callMeMaybe(instance.boot, this.bud)

    return this
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
  public get = function (name: string): Extension {
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
