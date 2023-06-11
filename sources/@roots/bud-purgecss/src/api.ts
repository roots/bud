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
  blocklist?: Array<RegExp | string>
  content?: Array<
    | {
        extension: string
        raw: string
      }
    | string
  >
  contentFunction?: (sourceFile: string) => Array<
    | {
        extension: string
        raw: string
      }
    | string
  >
  defaultExtractor?: ExtractorFunction
  extractors?: Array<Extractors>
  fontFace?: boolean
  keyframes?: boolean
  output?: string
  rejected?: boolean
  safelist?:
    | {
        deep?: RegExp[]
        greedy?: RegExp[]
        keyframes?: Array<RegExp | string>
        standard?: Array<RegExp | string>
        variables?: Array<RegExp | string>
      }
    | Array<RegExp | string>
  stdin?: boolean
  stdout?: boolean
  variables?: boolean
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
