import type {Options} from '@swc/core'

import {
  type Accessor,
  Extension,
  type ExtensionApi,
  type Getter,
  type Setter,
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
type JSCOptions = {
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
} & Options[`jsc`]

type BudJSCPublicInterface = ExtensionApi<BudJSCApi, JSCOptions>

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
  public declare baseUrl: Accessor<JSCOptions, `baseUrl`>
  public declare experimental: Accessor<JSCOptions, `experimental`>
  public declare externalHelpers: Accessor<JSCOptions, `externalHelpers`>

  public declare getBaseUrl: Getter<JSCOptions, `baseUrl`>
  public declare getExperimental: Getter<JSCOptions, `experimental`>
  public declare getExternalHelpers: Getter<JSCOptions, `externalHelpers`>

  public declare getKeepClassNames: Getter<JSCOptions, `keepClassNames`>
  public declare getLoose: Getter<JSCOptions, `loose`>
  public declare getMinify: Getter<JSCOptions, `minify`>

  public declare getParser: Getter<JSCOptions, `parser`>
  public declare getPaths: Getter<JSCOptions, `paths`>
  public declare getPreserveAllComments: Getter<
    JSCOptions,
    `preserveAllComments`
  >

  public declare getTarget: Getter<JSCOptions, `target`>
  public declare getTransform: Getter<JSCOptions, `transform`>
  public declare keepClassNames: Accessor<JSCOptions, `keepClassNames`>

  public declare loose: Accessor<JSCOptions, `loose`>
  public declare minify: Accessor<JSCOptions, `minify`>
  public declare parser: Accessor<JSCOptions, `parser`>

  public declare paths: Accessor<JSCOptions, `paths`>
  public declare preserveAllComments: Accessor<
    JSCOptions,
    `preserveAllComments`
  >
  public declare setBaseUrl: Setter<BudJSCApi, JSCOptions, `baseUrl`>

  public declare setExperimental: Setter<
    BudJSCApi,
    JSCOptions,
    `experimental`
  >
  public declare setExternalHelpers: Setter<
    BudJSCApi,
    JSCOptions,
    `externalHelpers`
  >
  public declare setKeepClassNames: Setter<
    BudJSCApi,
    JSCOptions,
    `keepClassNames`
  >

  public declare setLoose: Setter<BudJSCApi, JSCOptions, `loose`>
  public declare setMinify: Setter<BudJSCApi, JSCOptions, `minify`>
  public declare setParser: Setter<BudJSCApi, JSCOptions, `parser`>

  public declare setPaths: Setter<BudJSCApi, JSCOptions, `paths`>
  public declare setPreserveAllComments: Setter<
    BudJSCApi,
    JSCOptions,
    `preserveAllComments`
  >
  public declare setTarget: Setter<BudJSCApi, JSCOptions, `target`>

  public declare setTransform: Setter<BudJSCApi, JSCOptions, `transform`>
  public declare target: Accessor<JSCOptions, `target`>
  public declare transform: Accessor<JSCOptions, `transform`>

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
