/**
 * {@link @roots/wordpress-dependencies-webpack-plugin# | @roots/wordpress-dependencies-webpack-plugin} adapter
 *
 * @see https://roots.io/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import type { Extension } from '@roots/bud-framework';
import { WordPressDependenciesWebpackPlugin } from '@roots/wordpress-dependencies-webpack-plugin';

/**
 * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.make}
 *
 * @public
 */
export declare const make: Extension.CompilerPlugin<WordPressDependenciesWebpackPlugin, null>['make'];

/**
 * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.name}
 *
 * @public
 */
declare const name_2: Extension.CompilerPlugin['name'];
export { name_2 as name }

export { }
