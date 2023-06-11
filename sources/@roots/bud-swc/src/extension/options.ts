import {
  DynamicOption,
  Extension,
  type OptionCallback,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'
import type {Options} from '@swc/core'

import type {BudJSCPublicInterface, JSCOptions} from './jsc.js'

/**
 * Options related to SWC compiler
 *
 * @remarks
 * There are two additional properties: `typescript` and `ecmascript`.
 * These are used to override the base options for each language.
 * This is useful for using different options for
 * different file types but still using the same general config.
 */
type BudSWCOptions = {
  /**
   * Note: The type is string because it follows rust's regex syntax.
   */
  test?: Options[`test`]
  exclude?: Options[`exclude`]
  env?: Options[`env`]
  jsc?: Options[`jsc`]
  module?: Options[`module`]
  /**
   * - true to generate a sourcemap for the code and include it in the result object.
   * - "inline" to generate a sourcemap and append it as a data URL to the end of the code, but not include it in the result object.
   *
   * `swc-cli` overloads some of these to also affect how maps are written to disk:
   *
   * - true will write the map to a .map file on disk
   * - "inline" will write the file directly, so it will have a data: containing the map
   * - Note: These options are bit weird, so it may make the most sense to just use true
   *  and handle the rest in your own code, depending on your use case.
   */
  sourceMaps?: Options[`sourceMaps`]
  inlineSourcesContent?: Options[`inlineSourcesContent`]
}

type BudSWCPublicInterface = StrictPublicExtensionApi<
  BudSWCApi,
  BudSWCOptions
> & {
  ecmascript: BudJSCPublicInterface
  typescript: BudJSCPublicInterface
  parser: BudSWCOptions[`jsc`][`parser`]
  getParser(): BudSWCOptions[`jsc`][`parser`]
  setParser(
    parser: OptionCallback<JSCOptions, `parser`>,
  ): BudSWCPublicInterface
  experimental: BudSWCOptions[`jsc`][`experimental`]
  getExperimental(): BudSWCOptions[`jsc`][`experimental`]
  setExperimental(
    experimental: OptionCallback<JSCOptions, `experimental`>,
  ): BudSWCPublicInterface
  loose: BudSWCOptions[`jsc`][`loose`]
  getLoose(): BudSWCOptions[`jsc`][`loose`]
  setLoose(
    loose: OptionCallback<JSCOptions, `loose`>,
  ): BudSWCPublicInterface
  transform: BudSWCOptions[`jsc`][`transform`]
  getTransform(): BudSWCOptions[`jsc`][`transform`]
  setTransform(
    transform: OptionCallback<JSCOptions, `transform`>,
  ): BudSWCPublicInterface
  externalHelpers: BudSWCOptions[`jsc`][`externalHelpers`]
  getExternalHelpers(): BudSWCOptions[`jsc`][`externalHelpers`]
  setExternalHelpers(
    externalHelpers: OptionCallback<JSCOptions, `externalHelpers`>,
  ): BudSWCPublicInterface
  target: BudSWCOptions[`jsc`][`target`]
  getTarget(): BudSWCOptions[`jsc`][`target`]
  setTarget(
    target: OptionCallback<JSCOptions, `target`>,
  ): BudSWCPublicInterface
  keepClassNames: BudSWCOptions[`jsc`][`keepClassNames`]
  getKeepClassNames(): BudSWCOptions[`jsc`][`keepClassNames`]
  setKeepClassNames(
    keepClassNames: OptionCallback<JSCOptions, `keepClassNames`>,
  ): BudSWCPublicInterface
  baseUrl: BudSWCOptions[`jsc`][`baseUrl`]
  getBaseUrl(): BudSWCOptions[`jsc`][`baseUrl`]
  setBaseUrl(
    baseUrl: OptionCallback<JSCOptions, `baseUrl`>,
  ): BudSWCPublicInterface
  minify: BudSWCOptions[`jsc`][`minify`]
  getMinify(): BudSWCOptions[`jsc`][`minify`]
  setMinify(
    minify: OptionCallback<JSCOptions, `minify`>,
  ): BudSWCPublicInterface
  preserveAllComments: BudSWCOptions[`jsc`][`preserveAllComments`]
  getPreserveAllComments(): BudSWCOptions[`jsc`][`preserveAllComments`]
  setPreserveAllComments(
    preserveAllComments: OptionCallback<JSCOptions, `preserveAllComments`>,
  ): BudSWCPublicInterface
  plugins: BudSWCOptions[`jsc`][`experimental`][`plugins`]
  getPlugins(
    plugins: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ): BudSWCPublicInterface
  setPlugins(
    plugins: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ): BudSWCPublicInterface
  setExperimentalPlugins(
    plugins: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ): BudSWCPublicInterface
}

@options<BudSWCOptions>({
  jsc: {
    baseUrl: undefined,
    experimental: {
      cacheRoot: undefined,
      plugins: [],
    },
    externalHelpers: undefined,
    keepClassNames: undefined,
    loose: undefined,
    minify: undefined,
    parser: {
      syntax: `ecmascript`,
    },
    paths: undefined,
    preserveAllComments: undefined,
    target: undefined,
    transform: undefined,
  },
  sourceMaps: DynamicOption.make(({hooks}) => {
    const devtool = hooks.filter(`build.devtool`, false)
    if (devtool === false) return false
    if (devtool.includes(`inline`)) return `inline`
    return true
  }),
  env: undefined,
  test: undefined,
  exclude: undefined,
  module: undefined,
  inlineSourcesContent: undefined,
})
class BudSWCApi extends Extension<BudSWCOptions> {
  public declare jsc: BudSWCPublicInterface['jsc']
  public declare setJsc: BudSWCPublicInterface['setJsc']
  public declare getJsc: BudSWCPublicInterface['getJsc']

  public declare module: BudSWCPublicInterface[`module`]
  public declare setModule: BudSWCPublicInterface[`setModule`]
  public declare getModule: BudSWCPublicInterface[`getModule`]

  public declare sourceMaps: BudSWCPublicInterface[`sourceMaps`]
  public declare setSourceMaps: BudSWCPublicInterface[`setSourceMaps`]
  public declare getSourceMaps: BudSWCPublicInterface[`getSourceMaps`]

  public declare inlineSourcesContent: BudSWCPublicInterface[`inlineSourcesContent`]
  public declare setInlineSourcesContent: BudSWCPublicInterface[`setInlineSourcesContent`]
  public declare getInlineSourcesContent: BudSWCPublicInterface[`getInlineSourcesContent`]

  public declare test: BudSWCPublicInterface[`test`]
  public declare setTest: BudSWCPublicInterface[`setTest`]
  public declare getTest: BudSWCPublicInterface[`getTest`]

  public declare env: BudSWCPublicInterface[`env`]
  public declare setEnv: BudSWCPublicInterface[`setEnv`]
  public declare getEnv: BudSWCPublicInterface[`getEnv`]

  public declare exclude: BudSWCPublicInterface[`exclude`]
  public declare setExclude: BudSWCPublicInterface[`setExclude`]
  public declare getExclude: BudSWCPublicInterface[`getExclude`]

  public get parser() {
    return this.options.jsc.parser
  }
  @bind
  public getParser() {
    return this.options.jsc.parser
  }
  @bind
  public setParser(parser: OptionCallback<JSCOptions, `parser`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      parser: isFunction(parser) ? parser(jsc.parser) : parser,
    }))
    return this
  }

  public get experimental() {
    return this.options.jsc.experimental
  }
  @bind
  public getExperimental() {
    return this.options.jsc.experimental
  }
  @bind
  public setExperimental(
    experimental: OptionCallback<JSCOptions, `experimental`>,
  ) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      experimental: isFunction(experimental)
        ? experimental(jsc.experimental)
        : experimental,
    }))
    return this
  }

  public get loose() {
    return this.options.jsc.loose
  }
  @bind
  public getLoose() {
    return this.options.jsc.loose
  }
  @bind
  public setLoose(loose: OptionCallback<JSCOptions, `loose`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      loose: isFunction(loose) ? loose(jsc.loose) : loose,
    }))
    return this
  }

  public get transform() {
    return this.options.jsc.transform
  }
  @bind
  public getTransform() {
    return this.options.jsc.transform
  }
  @bind
  public setTransform(transform: OptionCallback<JSCOptions, `transform`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      transform: isFunction(transform)
        ? transform(jsc.transform)
        : transform,
    }))
    return this
  }

  public get externalHelpers() {
    return this.options.jsc.externalHelpers
  }
  @bind
  public getExternalHelpers() {
    return this.options.jsc.externalHelpers
  }
  @bind
  public setExternalHelpers(
    externalHelpers: OptionCallback<JSCOptions, `externalHelpers`>,
  ) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      externalHelpers: isFunction(externalHelpers)
        ? externalHelpers(jsc.externalHelpers)
        : externalHelpers,
    }))
    return this
  }

  public get target() {
    return this.options.jsc.target
  }
  @bind
  public getTarget() {
    return this.options.jsc.target
  }
  @bind
  public setTarget(target: OptionCallback<JSCOptions, `target`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      target: isFunction(target) ? target(jsc.target) : target,
    }))
    return this
  }

  public get keepClassNames() {
    return this.options.jsc.keepClassNames
  }
  @bind
  public getKeepClassNames() {
    return this.options.jsc.keepClassNames
  }
  @bind
  public setKeepClassNames(
    keepClassNames: OptionCallback<JSCOptions, `keepClassNames`>,
  ) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      keepClassNames: isFunction(keepClassNames)
        ? keepClassNames(jsc.keepClassNames)
        : keepClassNames,
    }))
    return this
  }

  public get baseUrl() {
    return this.options.jsc.baseUrl
  }
  @bind
  public getBaseUrl() {
    return this.options.jsc.baseUrl
  }
  @bind
  public setBaseUrl(baseUrl: OptionCallback<JSCOptions, `baseUrl`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      baseUrl: isFunction(baseUrl) ? baseUrl(jsc.baseUrl) : baseUrl,
    }))
    return this
  }

  public get minify() {
    return this.options.jsc.minify
  }
  @bind
  public getMinify() {
    return this.options.jsc.minify
  }
  @bind
  public setMinify(minify: OptionCallback<JSCOptions, `minify`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      minify: isFunction(minify) ? minify(jsc.minify) : minify,
    }))
    return this
  }

  public get preserveAllComments() {
    return this.options.jsc.preserveAllComments
  }
  @bind
  public getPreserveAllComments() {
    return this.options.jsc.preserveAllComments
  }
  @bind
  public setPreserveAllComments(
    preserveAllComments: OptionCallback<JSCOptions, `preserveAllComments`>,
  ) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      preserveAllComments: isFunction(preserveAllComments)
        ? preserveAllComments(jsc.preserveAllComments)
        : preserveAllComments,
    }))
    return this
  }

  /**
   * Set SWC plugins
   */
  @bind
  public setExperimentalPlugins(
    input: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ) {
    const value =
      typeof input === `function`
        ? input(this.options?.jsc?.experimental?.plugins ?? [])
        : input

    this.setJsc(jsc => ({
      ...(jsc ?? {}),
      experimental: {
        ...(jsc?.experimental ?? {}),
        plugins: [...(jsc?.experimental?.plugins ?? []), ...(value ?? [])],
      },
    }))
    return this
  }

  @bind
  public setPlugins(
    input: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ) {
    this.setExperimentalPlugins(input)
    return this
  }
}

export {BudSWCApi, type BudSWCPublicInterface, type Options}
