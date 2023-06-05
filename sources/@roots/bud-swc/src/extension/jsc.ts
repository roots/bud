import {
  Extension,
  type OptionAccessor,
  type OptionGetter,
  type OptionSetter,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@swc/core'

/**
 * Options related to SWC compiler
 *
 * @remarks
 * There are two additional properties: `typescript` and `ecmascript`.
 * These are used to override the base options for each language.
 * This is useful for using different options for
 * different file types but still using the same general config.
 */
type JSCOptions = Options[`jsc`] & {
  parser: Options[`jsc`][`parser`]
  loose: boolean
  transform: Options[`jsc`][`transform`]
  /**
   * Use `@swc/helpers` instead of inline helpers.
   */
  externalHelpers: Options[`jsc`][`externalHelpers`]
  /**
   * Defaults to `es3` (which enabled **all** pass).
   */
  target: Options[`jsc`][`target`]
  /**
   * Keep class names.
   */
  keepClassNames: Options[`jsc`][`keepClassNames`]
  experimental: Options[`jsc`][`experimental`]
  baseUrl: Options[`jsc`][`baseUrl`]
  paths: Options[`jsc`][`paths`]
  minify: Options[`jsc`][`minify`]
  preserveAllComments: Options[`jsc`][`preserveAllComments`]
}

type BudJSCPublicInterface = StrictPublicExtensionApi<
  BudJSCApi,
  JSCOptions
>

@options<JSCOptions>({
  baseUrl: undefined,
  experimental: undefined,
  externalHelpers: undefined,
  keepClassNames: undefined,
  loose: undefined,
  minify: undefined,
  parser: undefined,
  paths: undefined,
  preserveAllComments: undefined,
  target: undefined,
  transform: undefined,
})
class BudJSCApi extends Extension<JSCOptions> {
  public declare parser: OptionAccessor<JSCOptions, `parser`>
  public declare getParser: OptionGetter<JSCOptions, `parser`>
  public declare setParser: OptionSetter<BudJSCApi, JSCOptions, `parser`>

  public declare experimental: OptionAccessor<JSCOptions, `experimental`>
  public declare getExperimental: OptionGetter<JSCOptions, `experimental`>
  public declare setExperimental: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `experimental`
  >

  public declare loose: OptionAccessor<JSCOptions, `loose`>
  public declare getLoose: OptionGetter<JSCOptions, `loose`>
  public declare setLoose: OptionSetter<BudJSCApi, JSCOptions, `loose`>

  public declare transform: OptionAccessor<JSCOptions, `transform`>
  public declare getTransform: OptionGetter<JSCOptions, `transform`>
  public declare setTransform: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `transform`
  >

  public declare externalHelpers: OptionAccessor<
    JSCOptions,
    `externalHelpers`
  >
  public declare getExternalHelpers: OptionGetter<
    JSCOptions,
    `externalHelpers`
  >
  public declare setExternalHelpers: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `externalHelpers`
  >

  public declare target: OptionAccessor<JSCOptions, `target`>
  public declare getTarget: OptionGetter<JSCOptions, `target`>
  public declare setTarget: OptionSetter<BudJSCApi, JSCOptions, `target`>

  public declare keepClassNames: OptionAccessor<
    JSCOptions,
    `keepClassNames`
  >
  public declare getKeepClassNames: OptionGetter<
    JSCOptions,
    `keepClassNames`
  >
  public declare setKeepClassNames: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `keepClassNames`
  >

  public declare baseUrl: OptionAccessor<JSCOptions, `baseUrl`>
  public declare getBaseUrl: OptionGetter<JSCOptions, `baseUrl`>
  public declare setBaseUrl: OptionSetter<BudJSCApi, JSCOptions, `baseUrl`>

  public declare paths: OptionAccessor<JSCOptions, `paths`>
  public declare getPaths: OptionGetter<JSCOptions, `paths`>
  public declare setPaths: OptionSetter<BudJSCApi, JSCOptions, `paths`>

  public declare minify: OptionAccessor<JSCOptions, `minify`>
  public declare getMinify: OptionGetter<JSCOptions, `minify`>
  public declare setMinify: OptionSetter<BudJSCApi, JSCOptions, `minify`>

  public declare preserveAllComments: OptionAccessor<
    JSCOptions,
    `preserveAllComments`
  >
  public declare getPreserveAllComments: OptionGetter<
    JSCOptions,
    `preserveAllComments`
  >
  public declare setPreserveAllComments: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `preserveAllComments`
  >

  public setPlugins(
    plugins:
      | JSCOptions[`experimental`][`plugins`]
      | ((
          plugins?: JSCOptions[`experimental`][`plugins`],
        ) => JSCOptions[`experimental`][`plugins`]),
  ) {
    this.setExperimental((experimental = {}) => ({
      ...experimental,
    }))
  }
}

export {BudJSCApi, type BudJSCPublicInterface, type JSCOptions}
