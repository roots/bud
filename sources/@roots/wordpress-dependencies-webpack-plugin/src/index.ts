// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Extracts the dependencies from a WordPress plugin or theme which are provided by
 * WordPress' enqueue API. The assets which are extracted are made available in a manifest
 * file which can be read server-side.
 *
 * @packageDocumentation
 */

export {WordPressDependenciesWebpackPlugin} from './plugin'
