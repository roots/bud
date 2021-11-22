import {Framework} from '@roots/bud-framework'

/**
 * Purge unused CSS from compiled stylesheets
 *
 * @remarks
 * For more information, see [the PurgeCSS API](https://purgecss.com/configuration.html)
 *
 * @example
 * ```js
 * app.purge({
 *   content: [app.path('project', 'resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
interface purge {
  (this: Framework, userOptions: UserOptions): Framework
}

interface UserOptions {
  content?: Array<string | RawContent>
  contentFunction?: (
    sourceFile: string,
  ) => Array<string | RawContent>
  css: Array<string | RawCSS>
  defaultExtractor?: ExtractorFunction
  extractors?: Array<Extractors>
  fontFace?: boolean
  keyframes?: boolean
  output?: string
  rejected?: boolean
  stdin?: boolean
  stdout?: boolean
  variables?: boolean
  whitelist?: string[]
  whitelistPatterns?: Array<RegExp>
  whitelistPatternsChildren?: Array<RegExp>
}

interface RawContent<T = string> {
  extension: string
  raw: T
}

interface RawCSS {
  raw: string
}

type ExtractorFunction<T = string> = (content: T) => string[]

interface Extractors {
  extensions: string[]
  extractor: ExtractorFunction
}

const purge: purge = function (
  this: Framework,
  userOptions: UserOptions,
): Framework {
  this.postcss.setPlugin('@fullhuman/postcss-purgecss', [
    require('@fullhuman/postcss-purgecss'),
    userOptions,
  ])

  return this
}

export {purge}
