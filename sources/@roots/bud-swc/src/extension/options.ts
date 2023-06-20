import type {Options} from '@swc/core'

import {
  DynamicOption,
  Extension,
  type OptionCallback,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'

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
  env?: Options[`env`]
  exclude?: Options[`exclude`]
  inlineSourcesContent?: Options[`inlineSourcesContent`]
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
  /**
   * Note: The type is string because it follows rust's regex syntax.
   */
  test?: Options[`test`]
}

type BudSWCPublicInterface = StrictPublicExtensionApi<
  BudSWCApi,
  BudSWCOptions
> & {
  baseUrl: BudSWCOptions[`jsc`][`baseUrl`]
  ecmascript: BudJSCPublicInterface
  experimental: BudSWCOptions[`jsc`][`experimental`]
  externalHelpers: BudSWCOptions[`jsc`][`externalHelpers`]
  getBaseUrl(): BudSWCOptions[`jsc`][`baseUrl`]
  getExperimental(): BudSWCOptions[`jsc`][`experimental`]
  getExternalHelpers(): BudSWCOptions[`jsc`][`externalHelpers`]
  getKeepClassNames(): BudSWCOptions[`jsc`][`keepClassNames`]
  getLoose(): BudSWCOptions[`jsc`][`loose`]
  getMinify(): BudSWCOptions[`jsc`][`minify`]
  getParser(): BudSWCOptions[`jsc`][`parser`]
  getPlugins(
    plugins: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ): BudSWCPublicInterface
  getPreserveAllComments(): BudSWCOptions[`jsc`][`preserveAllComments`]
  getTarget(): BudSWCOptions[`jsc`][`target`]
  getTransform(): BudSWCOptions[`jsc`][`transform`]
  keepClassNames: BudSWCOptions[`jsc`][`keepClassNames`]
  loose: BudSWCOptions[`jsc`][`loose`]
  minify: BudSWCOptions[`jsc`][`minify`]
  parser: BudSWCOptions[`jsc`][`parser`]
  plugins: BudSWCOptions[`jsc`][`experimental`][`plugins`]
  preserveAllComments: BudSWCOptions[`jsc`][`preserveAllComments`]
  setBaseUrl(
    baseUrl: OptionCallback<JSCOptions, `baseUrl`>,
  ): BudSWCPublicInterface
  setExperimental(
    experimental: OptionCallback<JSCOptions, `experimental`>,
  ): BudSWCPublicInterface
  setExperimentalPlugins(
    plugins: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ): BudSWCPublicInterface
  setExternalHelpers(
    externalHelpers: OptionCallback<JSCOptions, `externalHelpers`>,
  ): BudSWCPublicInterface
  setKeepClassNames(
    keepClassNames: OptionCallback<JSCOptions, `keepClassNames`>,
  ): BudSWCPublicInterface
  setLoose(
    loose: OptionCallback<JSCOptions, `loose`>,
  ): BudSWCPublicInterface
  setMinify(
    minify: OptionCallback<JSCOptions, `minify`>,
  ): BudSWCPublicInterface
  setParser(
    parser: OptionCallback<JSCOptions, `parser`>,
  ): BudSWCPublicInterface
  setPlugins(
    plugins: OptionCallback<JSCOptions[`experimental`], `plugins`>,
  ): BudSWCPublicInterface
  setPreserveAllComments(
    preserveAllComments: OptionCallback<JSCOptions, `preserveAllComments`>,
  ): BudSWCPublicInterface
  setTarget(
    target: OptionCallback<JSCOptions, `target`>,
  ): BudSWCPublicInterface
  setTransform(
    transform: OptionCallback<JSCOptions, `transform`>,
  ): BudSWCPublicInterface
  target: BudSWCOptions[`jsc`][`target`]
  transform: BudSWCOptions[`jsc`][`transform`]
  typescript: BudJSCPublicInterface
}

@options<BudSWCOptions>({
  env: undefined,
  exclude: undefined,
  inlineSourcesContent: undefined,
  jsc: DynamicOption.make(bud => ({
    experimental: {
      cacheRoot: bud.path(bud.cache.cacheDirectory, `swc`),
      plugins: [],
    },
    parser: {
      dynamicImport: true,
      syntax: `ecmascript`,
    },
    target: `es2022`,
  })),
  module: {
    type: `es6`,
  },
  sourceMaps: DynamicOption.make(({hooks}) => {
    const devtool = hooks.filter(`build.devtool`, false)
    if (devtool === false) return false
    if (devtool.includes(`inline`)) return `inline`
    return true
  }),
  test: undefined,
})
class BudSWCApi extends Extension<BudSWCOptions> {
  public declare env: BudSWCPublicInterface[`env`]
  public declare exclude: BudSWCPublicInterface[`exclude`]
  public declare getEnv: BudSWCPublicInterface[`getEnv`]

  public declare getExclude: BudSWCPublicInterface[`getExclude`]
  public declare getInlineSourcesContent: BudSWCPublicInterface[`getInlineSourcesContent`]
  public declare getJsc: BudSWCPublicInterface['getJsc']

  public declare getModule: BudSWCPublicInterface[`getModule`]
  public declare getSourceMaps: BudSWCPublicInterface[`getSourceMaps`]
  public declare getTest: BudSWCPublicInterface[`getTest`]

  public declare inlineSourcesContent: BudSWCPublicInterface[`inlineSourcesContent`]
  public declare jsc: BudSWCPublicInterface['jsc']
  public declare module: BudSWCPublicInterface[`module`]

  public declare setEnv: BudSWCPublicInterface[`setEnv`]
  public declare setExclude: BudSWCPublicInterface[`setExclude`]
  public declare setInlineSourcesContent: BudSWCPublicInterface[`setInlineSourcesContent`]

  public declare setJsc: BudSWCPublicInterface['setJsc']
  public declare setModule: BudSWCPublicInterface[`setModule`]
  public declare setSourceMaps: BudSWCPublicInterface[`setSourceMaps`]

  public declare setTest: BudSWCPublicInterface[`setTest`]
  public declare sourceMaps: BudSWCPublicInterface[`sourceMaps`]
  public declare test: BudSWCPublicInterface[`test`]

  public get baseUrl() {
    return this.options.jsc.baseUrl
  }
  public get experimental() {
    return this.options.jsc.experimental
  }
  public get externalHelpers() {
    return this.options.jsc.externalHelpers
  }

  @bind
  public getBaseUrl() {
    return this.options.jsc.baseUrl
  }
  @bind
  public getExperimental() {
    return this.options.jsc.experimental
  }
  @bind
  public getExternalHelpers() {
    return this.options.jsc.externalHelpers
  }

  @bind
  public getKeepClassNames() {
    return this.options.jsc.keepClassNames
  }
  @bind
  public getLoose() {
    return this.options.jsc.loose
  }
  @bind
  public getMinify() {
    return this.options.jsc.minify
  }

  @bind
  public getParser() {
    return this.options.jsc.parser
  }
  @bind
  public getPreserveAllComments() {
    return this.options.jsc.preserveAllComments
  }
  @bind
  public getTarget() {
    return this.options.jsc.target
  }

  @bind
  public getTransform() {
    return this.options.jsc.transform
  }
  public get keepClassNames() {
    return this.options.jsc.keepClassNames
  }
  public get loose() {
    return this.options.jsc.loose
  }

  public get minify() {
    return this.options.jsc.minify
  }
  public get parser() {
    return this.options.jsc.parser
  }
  public get preserveAllComments() {
    return this.options.jsc.preserveAllComments
  }

  @bind
  public setBaseUrl(baseUrl: OptionCallback<JSCOptions, `baseUrl`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      baseUrl: isFunction(baseUrl) ? baseUrl(jsc.baseUrl) : baseUrl,
    }))
    return this
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
  @bind
  public setLoose(loose: OptionCallback<JSCOptions, `loose`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      loose: isFunction(loose) ? loose(jsc.loose) : loose,
    }))
    return this
  }

  @bind
  public setMinify(minify: OptionCallback<JSCOptions, `minify`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      minify: isFunction(minify) ? minify(jsc.minify) : minify,
    }))
    return this
  }
  @bind
  public setParser(parser: OptionCallback<JSCOptions, `parser`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      parser: isFunction(parser) ? parser(jsc.parser) : parser,
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
  @bind
  public setTarget(target: OptionCallback<JSCOptions, `target`>) {
    this.setJsc((jsc = {}) => ({
      ...jsc,
      target: isFunction(target) ? target(jsc.target) : target,
    }))
    return this
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

  public get target() {
    return this.options.jsc.target
  }

  public get transform() {
    return this.options.jsc.transform
  }
}

export {BudSWCApi, type BudSWCPublicInterface, type Options}
