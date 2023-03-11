// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * WordPress provides many packages which do not need to be included with project distributables.
 *
 * This package replaces source code references to WordPress provided packages and collects package
 * references in the {@link @roots/bud-entrypoints# | entrypoints manifest}
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud

 * @remarks
 * Best used with {@link @roots/bud-entrypoints# | @roots/bud-entrypoints extension}
 * as a peer extension.
 */

import './types.js'

import BudWordPressExternals from './extension.js'

export default BudWordPressExternals
