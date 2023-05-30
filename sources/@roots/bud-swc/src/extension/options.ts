import {Extension} from '@roots/bud-framework'
import type {StrictPublicExtensionApi} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@swc/core'

import type {BudJSCPublicInterface} from './jsc.js'

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
  /**
   * Note: The type is string because it follows rust's regex syntax.
   */
  exclude?: Options[`exclude`]
  env?: Options[`env`]
  jsc?: Options[`jsc`]
  module?: Options[`module`]
  minify?: Options[`minify`]
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
  plugins: any
  ecmascript: BudJSCPublicInterface
  typescript: BudJSCPublicInterface
}

@options<BudSWCOptions>({
  jsc: {
    baseUrl: undefined,
    experimental: undefined,
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
  minify: false,
  module: undefined,
  sourceMaps: undefined,
  inlineSourcesContent: undefined,
})
class BudSWCApi extends Extension<BudSWCOptions> {
  /**
   * Typescript specific configuration
   */
  public declare typescript: BudJSCPublicInterface

  /**
   * Ecmascript specific configuration
   */
  public declare ecmascript: BudJSCPublicInterface

  public declare jsc: BudSWCPublicInterface['jsc']
  public declare setJsc: BudSWCPublicInterface['setJsc']
  public declare getJsc: BudSWCPublicInterface['getJsc']

  public declare minify: BudSWCPublicInterface['minify']
  public declare setMinify: BudSWCPublicInterface['setMinify']
  public declare getMinify: BudSWCPublicInterface['getMinify']

  public declare module: BudSWCPublicInterface[`module`]
  public declare setModule: BudSWCPublicInterface[`setModule`]
  public declare getModule: BudSWCPublicInterface[`getModule`]

  public declare sourceMaps: BudSWCPublicInterface[`sourceMaps`]
  public declare setSourceMaps: BudSWCPublicInterface[`setSourceMaps`]
  public declare getSourceMaps: BudSWCPublicInterface[`getSourceMaps`]

  public declare inlineSourcesContent: BudSWCPublicInterface[`inlineSourcesContent`]
  public declare setInlineSourcesContent: BudSWCPublicInterface[`setInlineSourcesContent`]
  public declare getInlineSourcesContent: BudSWCPublicInterface[`getInlineSourcesContent`]
}

export {BudSWCApi, type BudSWCPublicInterface, type Options}
