import type {Options} from '@swc/core'

import {
  Extension,
  type OptionAccessor,
  type OptionGetter,
  type OptionSetter,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'

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
  baseUrl: Options[`jsc`][`baseUrl`]
  experimental: Options[`jsc`][`experimental`]
  /**
   * Use `@swc/helpers` instead of inline helpers.
   */
  externalHelpers: Options[`jsc`][`externalHelpers`]
  /**
   * Keep class names.
   */
  keepClassNames: Options[`jsc`][`keepClassNames`]
  loose: boolean
  minify: Options[`jsc`][`minify`]
  parser: Options[`jsc`][`parser`]
  paths: Options[`jsc`][`paths`]
  preserveAllComments: Options[`jsc`][`preserveAllComments`]
  /**
   * Defaults to `es3` (which enabled **all** pass).
   */
  target: Options[`jsc`][`target`]
  transform: Options[`jsc`][`transform`]
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
  public declare baseUrl: OptionAccessor<JSCOptions, `baseUrl`>
  public declare experimental: OptionAccessor<JSCOptions, `experimental`>
  public declare externalHelpers: OptionAccessor<
    JSCOptions,
    `externalHelpers`
  >

  public declare getBaseUrl: OptionGetter<JSCOptions, `baseUrl`>
  public declare getExperimental: OptionGetter<JSCOptions, `experimental`>
  public declare getExternalHelpers: OptionGetter<
    JSCOptions,
    `externalHelpers`
  >

  public declare getKeepClassNames: OptionGetter<
    JSCOptions,
    `keepClassNames`
  >
  public declare getLoose: OptionGetter<JSCOptions, `loose`>
  public declare getMinify: OptionGetter<JSCOptions, `minify`>

  public declare getParser: OptionGetter<JSCOptions, `parser`>
  public declare getPaths: OptionGetter<JSCOptions, `paths`>
  public declare getPreserveAllComments: OptionGetter<
    JSCOptions,
    `preserveAllComments`
  >

  public declare getTarget: OptionGetter<JSCOptions, `target`>
  public declare getTransform: OptionGetter<JSCOptions, `transform`>
  public declare keepClassNames: OptionAccessor<
    JSCOptions,
    `keepClassNames`
  >

  public declare loose: OptionAccessor<JSCOptions, `loose`>
  public declare minify: OptionAccessor<JSCOptions, `minify`>
  public declare parser: OptionAccessor<JSCOptions, `parser`>

  public declare paths: OptionAccessor<JSCOptions, `paths`>
  public declare preserveAllComments: OptionAccessor<
    JSCOptions,
    `preserveAllComments`
  >
  public declare setBaseUrl: OptionSetter<BudJSCApi, JSCOptions, `baseUrl`>

  public declare setExperimental: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `experimental`
  >
  public declare setExternalHelpers: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `externalHelpers`
  >
  public declare setKeepClassNames: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `keepClassNames`
  >

  public declare setLoose: OptionSetter<BudJSCApi, JSCOptions, `loose`>
  public declare setMinify: OptionSetter<BudJSCApi, JSCOptions, `minify`>
  public declare setParser: OptionSetter<BudJSCApi, JSCOptions, `parser`>

  public declare setPaths: OptionSetter<BudJSCApi, JSCOptions, `paths`>
  public declare setPreserveAllComments: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `preserveAllComments`
  >
  public declare setTarget: OptionSetter<BudJSCApi, JSCOptions, `target`>

  public declare setTransform: OptionSetter<
    BudJSCApi,
    JSCOptions,
    `transform`
  >
  public declare target: OptionAccessor<JSCOptions, `target`>
  public declare transform: OptionAccessor<JSCOptions, `transform`>

  public setPlugins(
    plugins:
      | ((
          plugins?: JSCOptions[`experimental`][`plugins`],
        ) => JSCOptions[`experimental`][`plugins`])
      | JSCOptions[`experimental`][`plugins`],
  ) {
    this.setExperimental((experimental = {}) => ({
      ...experimental,
    }))
  }
}

export {BudJSCApi, type BudJSCPublicInterface, type JSCOptions}
