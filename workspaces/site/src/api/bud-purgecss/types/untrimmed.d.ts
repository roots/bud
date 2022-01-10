/**
 * Adds purgecss support to Bud
 *
 * @example
 * ```ts
 * app.purge({
 *  content: [app.path('project', 'resources/views/**')],
 *  allow: require('purgecss-with-wordpress').whitelist,
 *  allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import { Extension } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';

/**
 * Module api
 *
 * @public
 */
export declare const api: Purge['api'];

/**
 * Purge unused CSS from compiled stylesheets
 *
 * @remarks
 * For more information, see [the PurgeCSS API](https://purgecss.com/configuration.html)
 *
 * @example
 * ```js
 * app.purgecss({
 *   content: [app.path('project', 'resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
declare interface api_2 {
    (this: Framework, userOptions: UserOptions): Framework;
}

declare type ExtractorFunction<T = string> = (content: T) => string[];

declare interface Extractors {
    extensions: string[];
    extractor: ExtractorFunction;
}

/**
 * Module name
 *
 * @public
 */
declare const name_2: Purge['name'];
export { name_2 as name }

declare interface Purge extends Extension.Module {
    name: string;
    register: register_2;
    api: {
        purgecss: api_2;
    };
}

/**
 * Module registration
 *
 * @todo facade bindings to `@roots/bud-extension`
 *
 * @public
 */
export declare const register: Purge['register'];

/**
 * Module registration
 *
 * @public
 */
declare interface register_2 {
    (app: Framework): Promise<void>;
}

/**
 * PurgeCSS UserOptions
 *
 * @see https://purgecss.com/plugins/postcss.html#options
 *
 * @public
 */
declare interface UserOptions {
    content?: Array<string | {
        extension: string;
        raw: string;
    }>;
    contentFunction?: (sourceFile: string) => Array<string | {
        extension: string;
        raw: string;
    }>;
    defaultExtractor?: ExtractorFunction;
    extractors?: Array<Extractors>;
    fontFace?: boolean;
    keyframes?: boolean;
    output?: string;
    rejected?: boolean;
    stdin?: boolean;
    stdout?: boolean;
    variables?: boolean;
    safelist?: {
        standard?: Array<RegExp | string>;
        deep?: RegExp[];
        greedy?: RegExp[];
        variables?: Array<RegExp | string>;
        keyframes?: Array<RegExp | string>;
    } | Array<RegExp | string>;
    blocklist?: Array<RegExp | string>;
}

export { }
