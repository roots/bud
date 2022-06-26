// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * SWC support for Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Build} from '@roots/bud-framework'

import BudSWC from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-swc': BudSWC
  }

  interface Loaders {
    swc: Build.Loader
  }

  interface Items {
    swc: Build.Item
  }

  interface Rules {
    js: Build.Rule
    ts: Build.Rule
  }
}

export default BudSWC
