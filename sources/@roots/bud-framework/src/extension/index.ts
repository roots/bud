import {bind} from '@roots/bud-support/decorators'
import {BudError, ImportError} from '@roots/bud-support/errors'
import get from '@roots/bud-support/lodash/get'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import set from '@roots/bud-support/lodash/set'

import type {Bud} from '../bud.js'
import type {Modules} from '../index.js'
import type {ApplyPluginConstructor} from './decorators/plugin.js'

export type Options<T = Record<string, any>> = {
  [K in keyof T as `${K & string}`]?: T[K]
}

export type OptionsMap<MappedOptions extends Options> = {
  [K in keyof MappedOptions as `${K & string}`]?:
    | ((app: Bud) => MappedOptions[K])
    | MappedOptions[K]
}

/**
 * Webpack plugin.
 */
export interface ApplyPlugin {
  /**
   * @see {@link https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture}
   */
  apply: (...args: any[]) => unknown
}

export interface Constructor {
  new (...args: any[]): Extension
}

export interface PublicExtensionApi<E extends Extension = Extension> {
  app: Bud
  /**
   * Set an option value
   */
  get: E[`getOption`]
  getOption: E[`getOption`]

  /**
   * Set an option value
   */
  set: <K extends string>(
    key: K,
    value:
      | this[`options`][K]
      | ((value: this[`options`][K]) => this[`options`][K]),
  ) => this

  /**
   * Set an option value
   */
  setOption: <K extends string>(
    key: K,
    value:
      | this[`options`][K]
      | ((value: this[`options`][K]) => this[`options`][K]),
  ) => this

  getOptions: E[`getOptions`]
  setOptions: E[`setOptions`]

  enabled: E['enabled']
  enable: E['enable']
  options: E['options']
  label: E['label']
}

export type ExtensionLiteral = Partial<Extension>

/**
 * Bud extension
 */
export class Extension<
  ExtensionOptions extends Options = Options,
  Plugin extends ApplyPlugin = ApplyPlugin,
> {
  /**
   * Application
   */
  public _app: () => Bud

  /**
   * Application accessor
   */
  public app: Bud

  /**
   * {@link ApplyPlugin.apply}
   */
  public declare apply?: ApplyPlugin[`apply`]

  public enabled: boolean = true

  /**
   * Extension options
   */
  public optionsMap: OptionsMap<ExtensionOptions> = {}

  /**
   * Extension options
   *
   * @readonly
   */
  public readonly options: ExtensionOptions
  /**
   * Extension meta
   */
  public meta: {
    register: boolean
    boot: boolean
    configAfter: boolean
    buildBefore: boolean
    buildAfter: boolean
  } = {
    register: false,
    boot: false,
    configAfter: false,
    buildBefore: false,
    buildAfter: false,
  }

  /**
   * The module name
   */
  public label: keyof Modules & string

  /**
   * Logger instance
   */
  public get logger() {
    return this.app.context.logger.scope(
      ...[this.app.label, this.label].filter(Boolean),
    )
  }

  /**
   * Depends on
   */
  public dependsOn?: Set<keyof Modules & string>

  /**
   * Depends on (optional)
   */
  public dependsOnOptional?: Set<`${keyof Modules & string}`>

  /**
   * Function returning a boolean indicating if the {@link Extension} should be utilized.
   *
   * @remarks
   * By default returns {@link Extension.enabled}
   */
  public when(bud: Bud, options?: ExtensionOptions): boolean {
    return this.enabled
  }

  /**
   * `init` callback
   */
  public async init?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * {@link Extension.register}
   */
  public async register?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `boot` callback
   *
   * @param options - Extension options
   * @param app - Bud instance
   */
  public async boot?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `configAfter` callback
   */
  public async configAfter?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `buildBefore` callback
   */
  public async buildBefore?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `buildAfter` callback
   */
  public async buildAfter?(
    app: Bud,
    options?: ExtensionOptions,
  ): Promise<unknown>

  /**
   * `make` callback
   */
  public async make?(app: Bud, options?: ExtensionOptions): Promise<Plugin>

  /**
   * Plugin constructor
   */
  public plugin?: ApplyPluginConstructor

  /**
   * Class constructor
   */
  public constructor(app: Bud) {
    this._app = () => app
    Object.defineProperty(this, `app`, {
      get: (): Bud => this._app(),
    })

    const opts = this.options ?? {}

    Object.defineProperty(this, `options`, {
      get: this.getOptions,
      set: this.setOptions,
    })

    this.setOptions(opts as any)
  }

  /**
   * `register` callback handler
   */
  @bind
  public async _register() {
    if (isUndefined(this.register)) return

    try {
      await this.register(this.app, this.options)
      this.meta[`register`] = true
    } catch (error) {
      throw error
    }

    this.logger.success(`registered`)
  }

  /**
   * `boot` callback handler
   */
  @bind
  public async _boot() {
    if (isUndefined(this.boot)) return

    if (!this.meta[`register`]) await this._register()

    try {
      await this.boot(this.app, this.options)
      this.meta[`boot`] = true
    } catch (error) {
      throw error
    }

    this.logger.success(`booted`)
  }

  /**
   * `buildBefore` callback handler
   */
  @bind
  public async _buildBefore() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.buildBefore) || enabled === false) return
    this.logger.info(
      `buildBefore:`,
      this.label ?? this.constructor.name ?? `anonymous extension`,
    )

    this.meta[`buildBefore`] = true

    await this.buildBefore(this.app, this.options)
  }

  /**
   * `buildAfter` callback handler
   */
  @bind
  public async _buildAfter() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.buildAfter) || enabled === false) return
    this.logger.info(
      `buildAfter:`,
      this.label ?? this.constructor.name ?? `anonymous extension`,
    )
    this.logger.log(`buildAfter`)
    this.meta[`buildAfter`] = true

    await this.buildAfter(this.app, this.options)
  }

  /**
   * `configAfter` callback handler
   */
  @bind
  public async _configAfter() {
    const enabled = await this.isEnabled()
    if (isUndefined(this.configAfter) || enabled === false) return
    this.logger.log(`configAfter`)
    this.meta[`configAfter`] = true

    await this.configAfter(this.app, this.options)
  }

  /**
   * `make` callback handler
   */
  @bind
  public async _make() {
    if (isUndefined(this.make) && isUndefined(this.plugin)) {
      return false
    }

    if (this.isEnabled() === false) {
      return false
    }

    try {
      if (!isUndefined(this.apply)) {
        this.logger.info(`apply prop found. return extension instance`)
        return this
      }

      if (!isUndefined(this.plugin)) {
        const plugin = new this.plugin(this.options)
        this.logger.success(`produced webpack plugin`)
        return plugin
      }

      if (!isUndefined(this.make)) {
        const plugin = await this.make(this.app, this.options)
        this.logger.success(`produced webpack plugin`)
        return plugin
      }
    } catch (error) {
      const ident =
        this.label ?? this.constructor?.name ?? `unknown_extension`

      throw new BudError(`Error instantiating ${ident}`, {
        props: {
          details: `Check options for ${ident}`,
          thrownBy: this.constructor.name,
          origin: BudError.normalize(error),
          docs: new URL(`https://bud.js.org/docs/extensions`),
          issues: new URL(
            `https://github.com/roots/bud/search?q=is:issue+${ident} in:title`,
          ),
        },
      })
    }
  }

  /**
   * Get extension options
   */
  @bind
  public getOptions(): ExtensionOptions {
    return Object.entries(this.optionsMap ?? {}).reduce(
      this.fromOptionsMap,
      {} as ExtensionOptions,
    )
  }

  /**
   * Set extension options
   */
  @bind
  public setOptions(
    value:
      | ExtensionOptions
      | ((options: ExtensionOptions) => ExtensionOptions),
  ): this {
    this.optionsMap = isFunction(value) ? value(this.options) : value

    return this
  }

  /**
   * Get extension option
   */
  @bind
  public getOption<K extends string>(key: K): ExtensionOptions[K] {
    const raw = this.getOptions()
    return get(raw, key)
  }
  public get = this.getOption

  /**
   * Set extension option
   */
  @bind
  public setOption<K extends string>(
    key: K,
    value:
      | OptionsMap<ExtensionOptions>[K]
      | ((
          value: OptionsMap<ExtensionOptions>[K],
        ) => OptionsMap<ExtensionOptions>[K]),
  ): this {
    if (!this.optionsMap) this.optionsMap = {}

    set(
      this.optionsMap,
      key,
      isFunction(value) ? value(this.getOption(key)) : value,
    )

    return this
  }
  public set = this.setOption

  /**
   * Normalize options to functions
   */
  @bind
  public toOptionsMap<K extends keyof ExtensionOptions & string>(
    funcMap: OptionsMap<ExtensionOptions> = {},
    [key, value]: [K & string, ExtensionOptions[K & string]],
  ): OptionsMap<ExtensionOptions> {
    return {
      ...funcMap,
      [key]: isFunction(value) ? value : () => value,
    }
  }

  /**
   * Get options from function map
   */
  @bind
  public fromOptionsMap<K extends keyof OptionsMap<ExtensionOptions>>(
    options: ExtensionOptions,
    [key, value]: [K, OptionsMap<ExtensionOptions>[K]],
  ): ExtensionOptions {
    return {
      ...(options ?? {}),
      [key]: isFunction(value) ? value(this.app) : value,
    } as ExtensionOptions
  }

  /**
   * Assign properties from an object
   */
  @bind
  public fromObject(extensionObject: ExtensionLiteral): this {
    extensionObject &&
      Object.entries(extensionObject).map(([k, v]) => {
        this[k] = v
      })

    return this
  }

  /**
   * Returns true if extension property is set and is a function
   */
  @bind
  public isFunction<K extends `${keyof Extension}`>(key: K): boolean {
    return key in this && isFunction(this[key]) ? true : false
  }

  /**
   * Resolve module using `import.meta.resolve` api
   */
  @bind
  public async resolve(
    signifier: string,
    context?: string,
  ): Promise<string> {
    let modulePath: string

    try {
      modulePath = await this.app.module.resolve(signifier, context)
    } catch (error) {
      const cause = BudError.normalize(error)
      throw new ImportError(`could not resolve ${signifier}`, {
        props: {
          thrownBy: this.label,
          origin: cause,
        },
      })
    }

    return modulePath
  }

  /**
   * Import ESM module
   */
  @bind
  public async import<T = any>(
    signifier: string,
    context?: string,
  ): Promise<T | undefined> {
    try {
      const result = await this.app.module.import(signifier, context)
      this.logger.success(`imported`, signifier)
      return result?.default ?? result ?? undefined
    } catch (error) {
      throw new ImportError(`could not import ${signifier}`, {
        props: {
          thrownBy: this.label,
          origin: ImportError.normalize(error),
        },
      })
    }
  }

  /**
   * Disable extension
   * @deprecated pass `false` to {@link Extension.enable}
   */
  @bind
  public disable() {
    this.enabled = false
  }

  /**
   * Enable extension
   */
  @bind
  public enable(enabled = true) {
    this.enabled = enabled
    return this
  }

  /**
   * Is extension enabled?
   */
  @bind
  public isEnabled(): boolean {
    return this.when(this.app, this.options)
  }
}
