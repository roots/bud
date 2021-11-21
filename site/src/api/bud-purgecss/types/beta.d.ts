/**
 * Adds purgecss support to Bud
 *
 * @remarks
 * Requires {@link @roots/bud-postcss# | @roots/bud-postcss} to be installed
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import { Framework } from '@roots/bud-framework';

export declare const api: {
    purge: purge;
};

declare type ExtractorFunction<T = string> = (content: T) => string[];

declare interface Extractors {
    extensions: string[];
    extractor: ExtractorFunction;
}

declare const name_2 = "@roots/bud-purgecss";
export { name_2 as name }

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
declare interface purge {
    (this: Framework, userOptions: UserOptions): Framework;
}

declare const purge: purge;

declare interface RawContent<T = string> {
    extension: string;
    raw: T;
}

declare interface RawCSS {
    raw: string;
}

declare interface UserOptions {
    content?: Array<string | RawContent>;
    contentFunction?: (sourceFile: string) => Array<string | RawContent>;
    css: Array<string | RawCSS>;
    defaultExtractor?: ExtractorFunction;
    extractors?: Array<Extractors>;
    fontFace?: boolean;
    keyframes?: boolean;
    output?: string;
    rejected?: boolean;
    stdin?: boolean;
    stdout?: boolean;
    variables?: boolean;
    whitelist?: string[];
    whitelistPatterns?: Array<RegExp>;
    whitelistPatternsChildren?: Array<RegExp>;
}

export { }
