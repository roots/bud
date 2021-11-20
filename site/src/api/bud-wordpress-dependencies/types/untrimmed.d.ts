/**
 * {@link @roots/wordpress-dependencies-webpack-plugin# | @roots/wordpress-dependencies-webpack-plugin} adapter
 *
 * @see https://roots.io/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import type { Extension } from '@roots/bud-framework';
import { WordPressDependenciesWebpackPlugin } from '@roots/wordpress-dependencies-webpack-plugin';

/**
 * @public
 */
export declare const make: Extension.CompilerPlugin<WordPressDependenciesWebpackPlugin, null>['make'];

/**
 * @public
 */
declare const name_2: Extension.CompilerPlugin['name'];
export { name_2 as name }

export { }
