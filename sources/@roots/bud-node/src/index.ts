// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds emotioncss support to `@roots/bud`
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import BudNode from '@roots/bud-node/extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-node': BudNode
  }
}

export {BudNode as default}
