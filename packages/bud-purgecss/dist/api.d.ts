import type { Bud } from '@roots/bud';
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
declare const config: (this: Bud, { enabled, ...options }: {
    [x: string]: any;
    enabled?: boolean | undefined;
}) => Bud;
export = config;
//# sourceMappingURL=api.d.ts.map