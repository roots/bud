import type {Modules} from '@roots/bud-framework'
import type {Compiler} from '@roots/bud-framework/config'
import type {ApplyPluginConstructor} from '@roots/bud-framework/extension/decorators/plugin'
import type * as Model from '@roots/bud-framework/extension/types'

import {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import get from '@roots/bud-support/get'
import isFunction from '@roots/bud-support/isFunction'
import isObject from '@roots/bud-support/isObject'
import isUndefined from '@roots/bud-support/isUndefined'
import logger from '@roots/bud-support/logger'
import set from '@roots/bud-support/set'
import DynamicOption, {
  isValue as isDynamicOption,
} from '@roots/bud-support/value'

export class Extension<
  Options extends Model.OptionsInterface = Model.OptionsInterface,
  Plugin extends Model.ApplyPlugin = Model.ApplyPlugin,
> implements Model.BudExtension<Options, Plugin>
{
  public declare _app: () => Model.BudExtension<Options, Plugin>[`app`]

  public declare _options: Partial<Model.InternalOptions<Options>>

  public declare dependsOn?: Set<keyof Modules & string>

  public declare dependsOnOptional?: Set<`${keyof Modules & string}`>

  public declare label?: `${keyof Modules & string}`

  public declare plugin?: ApplyPluginConstructor

  public options: Options

  public apply?(compiler: Compiler): unknown | void

  public boot?(app: Bud): Promise<unknown | void>

  public buildAfter?(app: Bud): Promise<unknown | void>

  public buildBefore?(app: Bud): Promise<unknown | void>

  public configAfter?(app: Bud): Promise<unknown | void>

  public when?(bud: Bud, options?: Options): boolean

  public get app(): Bud {
    return this._app()
  }

  public enabled: boolean = true

  public meta: Model.Meta = {
    boot: false,
    buildAfter: false,
    buildBefore: false,
    compilerDone: false,
    configAfter: false,
    register: false,
  }

  public constructor(app: Bud) {
    this._app = () => app

    this._options = this.options ? {...this.options} : {}
    delete this.options

    Object.defineProperty(this, `options`, {
      get: this.getOptions.bind(this),
    })
  }

  @bind
  public catch(error: Error | string): never {
    const label =
      this.label ?? this.constructor?.name ?? `unknown_extension`

    throw BudError.normalize(error, {
      docs: new URL(`https://bud.js.org/docs/extensions`),
      issue: new URL(
        `https://github.com/roots/bud/search?q=is:issue+${label} in:title`,
      ),
      name: label,
      thrownBy: import.meta.url,
    })
  }

  @bind
  public disable() {
    this.enabled = false
  }

  @bind
  public done(): Bud {
    return this.app
  }

  @bind
  public enable(enabled: boolean | Bud = true) {
    this.logger.log(enabled ? `enabled` : `disabled`)

    if (enabled instanceof Bud) {
      this.enabled = true
      return this
    }

    this.enabled = enabled
    return this
  }

  @bind
  public getOption<K extends string>(key: K): Options[K] {
    return get(this.getOptions(), key)
  }

  public get = this.getOption

  @bind
  public getOptions(): Options {
    return Object.entries(this._options).reduce((acc, [key, value]) => {
      if (isUndefined(value)) return acc
      if (!isObject(value)) return {...acc, [key]: value}

      const unwrapped = isDynamicOption(value)
        ? value.get()(this.app)
        : value

      if (isUndefined(unwrapped)) return acc
      return {...acc, [key]: unwrapped}
    }, {} as Options)
  }

  @bind
  public async import<T = any>(
    signifier: string,
    context: string,
    options: {bustCache?: boolean; raw?: boolean} = {
      bustCache: false,
      raw: false,
    },
  ): Promise<T | undefined> {
    return await this.app.module
      .import(signifier, context, options)
      .catch(this.catch)
  }

  @bind
  public isEnabled(): boolean {
    return `when` in this
      ? this.when(this.app, this.getOptions())
      : this.enabled
  }

  public get logger(): any {
    const scopes = []

    this.app.isChild && scopes.push(this.app.label)
    this.label && scopes.push(this.label)

    return logger.scope(...scopes)
  }

  public async make?(app: Bud, options?: Options): Promise<Plugin>

  public async register?(app: Bud): Promise<any>

  @bind
  public async resolve(
    signifier: string,
    context: string,
  ): Promise<false | string> {
    return await this.app.module.resolve(signifier, context)
  }

  @bind
  public setOption<K extends string>(
    key: K,
    valueOrCallback: Model.OptionCallbackValue<Options, K>,
  ): this {
    if (isFunction(valueOrCallback)) {
      const resolved = valueOrCallback(this.get(key))
      set(this._options, key, resolved)
      this.logger.info(`Set option:`, key, `=>`, resolved)
      return this
    }

    set(this._options, key, valueOrCallback)
    this.logger.info(`Set option:`, key, `=>`, valueOrCallback)
    return this
  }

  public set = this.setOption

  @bind
  public setOptions(value: Partial<Model.InternalOptions<Options>>): this {
    this.logger.info(`Set options:`, value)
    this._options = value
    return this
  }

  @bind
  public async execute(key: `${keyof Model.Meta & string}` | `make`) {
    await this.app.resolvePromises()

    if (key === `make`) {
      if (!this.isEnabled()) return false

      if (!isUndefined(this.apply)) {
        this.logger.log(
          `Produced hybrid compiler plugin / bud extension:`,
          this.label,
        )
        this.logger.info(this)
        return this
      }

      if (!isUndefined(this.plugin)) {
        const plugin = new this.plugin({...this.getOptions()})
        this.logger.log(`Produced compiler plugin:`, this.label)
        this.logger.info(plugin)
        return plugin
      }

      if (!isUndefined(this.make)) {
        const plugin = await this.make(this.app, {...this.getOptions()})
        this.logger.log(`Produced make plugin:`, this.label)
        this.logger.info(plugin)
        return plugin
      }

      return false
    }

    if (isUndefined(this[key])) return false

    if (this.meta[key] === true) return false
    this.meta[key] = true

    if (
      [`buildAfter`, `buildBefore`, `configAfter`].includes(key) &&
      !this.isEnabled()
    )
      return false

    this.logger.log(`Executing:`, key)

    await this[key](this.app)
    await this.app.resolvePromises()

    return true
  }
}

export type {
  Accessor,
  ApplyPlugin,
  BudExtension,
  Constructor,
  ExtensionApi,
  Getter,
  InternalOptions,
  Meta,
  Option,
  OptionCallback,
  OptionCallbackValue,
  OptionsInterface,
  Setter,
  WithOptions,
} from '@roots/bud-framework/extension/types'

export {DynamicOption, isDynamicOption}
