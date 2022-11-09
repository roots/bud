import type {Bud, Extension} from '@roots/bud-framework'

/**
 * Module registration
 *
 * @public
 */
export interface register {
  (options: any, app: Bud): Promise<void>
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
export interface api {
  (this: Bud, userOptions: UserOptions): Bud
}

export interface Purge extends Extension {
  name: string
  register: register
}

/**
 * PurgeCSS UserOptions
 *
 * @see https://purgecss.com/plugins/postcss.html#options
 *
 * @public
 */
export interface UserOptions {
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

import {purgecss} from './api.js'

export const label = `@roots/bud-purgecss`

export const dependsOn = new Set([`@roots/bud-postcss`])

export const register = async (app: Bud) => {
  app.api.bindFacade(`purgecss`, purgecss)
}
