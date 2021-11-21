/**
 * WordPress provides many packages which do not need to be included with project distributables.
 *
 * This package replaces source code references to WordPress provided packages and collects package
 * references in the {@link @roots/bud-entrypoints# | entrypoints manifest}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud

 * @remarks
 * Best used with {@link @roots/bud-entrypoints# | @roots/bud-entrypoints extension}
 * as a peer extension.
 *
 * @packageDocumentation
 */

import { WordPressExternals } from '@roots/wordpress-externals-webpack-plugin';

export declare const make: () => WordPressExternals;

declare const name_2: "@roots/wordpress-externals-webpack-plugin";
export { name_2 as name }

export { }
