import type {Bud} from '@roots/bud'

/**
 * Purge unused CSS from compiled stylesheets
 *
 * @remarks
 * For more information, see [the PurgeCSS API](https://purgecss.com/configuration.html)
 *
 * @example
 * ```js
 * app.purgecss({
 *   content: [app.path('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
export interface purge {
  (this: Bud, userOptions: Options): Bud
}

/**
 * PurgeCSS options
 *
 * @see https://purgecss.com/plugins/postcss.html#options
 */
export interface Options {
  content?: Array<
    | string
    | {
        extension: string
        raw: string
      }
  >
  contentFunction?: (sourceFile: string) => Array<
    | string
    | {
        extension: string
        raw: string
      }
  >
  defaultExtractor?: ExtractorFunction
  extractors?: Array<Extractors>
  fontFace?: boolean
  keyframes?: boolean
  output?: string
  rejected?: boolean
  stdin?: boolean
  stdout?: boolean
  variables?: boolean
  safelist?:
    | {
        standard?: Array<RegExp | string>
        deep?: RegExp[]
        greedy?: RegExp[]
        variables?: Array<RegExp | string>
        keyframes?: Array<RegExp | string>
      }
    | Array<RegExp | string>
  blocklist?: Array<RegExp | string>
}

export type ExtractorFunction<T = string> = (content: T) => string[]

export interface Extractors {
  extensions: string[]
  extractor: ExtractorFunction
}

/**
 * Purge unused CSS from compiled stylesheets
 *
 * @remarks
 * For more information, see [the PurgeCSS API](https://purgecss.com/configuration.html)
 *
 * @example
 * ```js
 * app.purgecss({
 *   content: [app.path('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
export const purgecss: purge = function (userOptions) {
  this.postcss
    .setPlugin(`purgecss`, [`@fullhuman/postcss-purgecss`, userOptions])
    .use(plugins => [...plugins, `purgecss`])

  return this
}
