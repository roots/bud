import type { Bud } from '@roots/bud';
interface RawContent<T = string> {
    extension: string;
    raw: T;
}
interface RawCSS {
    raw: string;
}
declare type ExtractorFunction<T = string> = (content: T) => string[];
interface Extractors {
    extensions: string[];
    extractor: ExtractorFunction;
}
declare type PurgeCssOptions = {
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
};
declare type BudPurgeOptions = {
    enabled: boolean;
    options: PurgeCssOptions;
};
/**
 * ## bud.purge
 *
 * Purge unused CSS from compiled stylesheets
 *
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 *
 * ```js
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
declare const config: (this: Bud, options: BudPurgeOptions) => Bud;
export { config };
//# sourceMappingURL=api.d.ts.map