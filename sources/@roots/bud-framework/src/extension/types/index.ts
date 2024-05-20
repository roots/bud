import type {Bud, Modules} from '@roots/bud-framework'
import type {Compiler} from '@roots/bud-framework/config'
import type {ApplyPluginConstructor} from '@roots/bud-framework/extension/decorators/plugin'

import {type Logger} from '@roots/bud-support/logger'
import DynamicOption from '@roots/bud-support/value'

export type OptionsInterface<T = Record<string, any>> = {
  [K in keyof T as `${K & string}`]?: T[K]
}

export type InternalOptions<T extends OptionsInterface> = {
  [K in keyof T as `${K & string}`]:
    | DynamicOption<(app: Bud) => T[K]>
    | T[K]
}

export type OptionCallback<
  T extends OptionsInterface,
  K extends `${keyof OptionsInterface & string}`,
> = ((value: T[K]) => T[K]) | T[K]

export type OptionCallbackValue<
  T extends OptionsInterface,
  K extends `${keyof OptionsInterface & string}`,
> = ((value: T[K]) => T[K]) | InternalOptions<T>[K]

export type Setter<
  Extension,
  OptionsInterface,
  Property extends `${keyof OptionsInterface & string}`,
> = (value: OptionCallbackValue<OptionsInterface, Property>) => Extension

export type Getter<
  Options extends OptionsInterface = OptionsInterface,
  Property extends
    `${keyof OptionsInterface & string}` = `${keyof OptionsInterface & string}`,
> = () => Options[Property]

export type Accessor<
  Options extends OptionsInterface,
  Property extends `${keyof OptionsInterface & string}`,
> = Options[Property]

export type Option<
  Extension,
  Options extends OptionsInterface,
  Property extends `${keyof Options & string}`,
> = {
  get: Getter<Options, Property>
  set: Setter<Extension, Options, Property>
  value: Accessor<Options, Property>
}

export interface Meta {
  boot: boolean
  buildAfter: boolean
  buildBefore: boolean
  compilerDone: boolean
  configAfter: boolean
  register: boolean
}

export interface Constructor {
  new (...args: any[]): BudExtension
}

export type WithOptions<Context, Options> = {
  [K in keyof Options as `${K & string}`]: Options[K]
} & {
  [Prop in keyof Options as `get${Capitalize<
    Prop & string
  >}`]: () => Options[Prop]
} & {
  [Prop in keyof Options as `set${Capitalize<Prop & string>}`]: (
    value: OptionCallbackValue<Options, `${Prop & string}`>,
  ) => Context
}

export type ExtensionApi<
  Context,
  Options extends OptionsInterface,
> = BudExtension<Options> & WithOptions<Context, Options>

/**
 * Webpack plugin.
 */
export interface ApplyPlugin {
  /**
   * @see {@link https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture}
   */
  apply(...args: any[]): unknown
}

export interface BudExtension<
  Options extends OptionsInterface = OptionsInterface,
  Plugin extends ApplyPlugin = ApplyPlugin,
> {
  _app: () => Bud
  _options: Partial<InternalOptions<Options>>

  /**
   * Extension.app
   */
  app: Bud

  /**
   * {@link ApplyPlugin.apply} callback
   */
  apply?(compiler: Compiler): unknown | void

  /**
   * `boot` callback
   */
  boot?(app: Bud): Promise<unknown | void>

  /**
   * `buildAfter` callback
   */
  buildAfter?(app: Bud): Promise<unknown | void>

  /**
   * `buildBefore` callback
   */
  buildBefore?(app: Bud): Promise<unknown | void>

  /**
   * Error handler
   */
  catch(error: Error | string): never

  /**
   * `configAfter` callback
   */
  configAfter?(app: Bud): Promise<unknown | void>

  /**
   * Depends on
   */
  dependsOn?: Set<keyof Modules & string>

  /**
   * Depends on (optional)
   */
  dependsOnOptional?: Set<`${keyof Modules & string}`>

  /**
   * Disable extension
   * @deprecated pass `false` to {@link Extension.enable}
   */
  disable(): void

  /**
   * Return to bud instance from extension
   */
  done(): Bud

  /**
   * Enable extension
   */
  enable(enabled?: boolean | Bud): this

  /**
   * Extension.enabled
   *
   * @remarks
   * If `true`, the extension is enabled.
   */
  enabled: boolean
  execute(key: `${keyof Meta & string}` | `make`): Promise<unknown>

  /**
   * Get an option value
   */
  get: BudExtension['getOption']

  /**
   * Get option
   */
  getOption<K extends string>(key: K): Options[K]

  /**
   * Get options
   */
  getOptions(): Options

  /**
   * Extension.import
   */
  import<T = any>(
    signifier: string,
    context: string,
    options?: {bustCache?: boolean; raw?: boolean},
  ): Promise<T | undefined>

  /**
   * Is extension enabled?
   */
  isEnabled(): boolean

  /**
   * The module name
   */
  label?: `${keyof Modules & string}`

  /**
   * Logger instance
   */
  logger: Logger

  /**
   * `make` callback
   */
  make?(app: Bud, options?: Options): Promise<Plugin>

  /**
   * Extension.meta
   *
   * @remarks
   * Tracks which extension methods have been executed to prevent
   * duplicate execution in race conditions, etc.
   */
  meta: Meta

  /**
   * Extension.options
   *
   * @readonly
   */
  options: Options

  /**
   * Plugin constructor
   */
  plugin?: ApplyPluginConstructor

  /**
   * {@link Extension.register}
   */
  register?(app: Bud): Promise<any>

  /**
   * Resolve module using `import.meta.resolve` api
   */
  resolve(signifier: string, context: string): Promise<false | string>

  /**
   * Set option
   */
  set: BudExtension['setOption']

  /**
   * Set option
   */
  setOption<K extends string>(
    key: K,
    valueOrCallback: OptionCallbackValue<Options, K>,
  ): BudExtension

  /**
   * Set options
   */
  setOptions(value: Partial<InternalOptions<Options>>): BudExtension

  /**
   * Extension.when
   *
   * Function returning a boolean indicating if the {@link Extension} should be utilized.
   *
   * @remarks
   * If set this takes precedence over {@link Extension.enabled}.
   */
  when?(bud: Bud, options?: Options): boolean
}
