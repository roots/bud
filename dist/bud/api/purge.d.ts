import type { Bud } from './types';
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
declare const purge: ({ enabled, ...options }: {
    [x: string]: any;
    enabled?: boolean;
}) => Bud;
export { purge };
//# sourceMappingURL=purge.d.ts.map