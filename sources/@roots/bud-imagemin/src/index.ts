// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add image optimization support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: BudImagemin
  }

  interface Modules {
    '@roots/bud-imagemin': BudImagemin
  }
}

import BudImagemin from './extension'
export default BudImagemin
