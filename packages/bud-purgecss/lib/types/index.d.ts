import { Plugin } from '@roots/bud-framework';
import * as purgeWordPress from 'purgecss-with-wordpress';
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
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
declare const purgecss: Plugin;
export { purgecss, purgeWordPress };
//# sourceMappingURL=index.d.ts.map