// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds prettier support to Bud
 *
 * @beta
 * This extension  only adds Prettier as a managed dependency of the Bud framework.
 * It does not add any aditional functionality or tie into the build process.
 *
 * It will be developed further as the Framework matures.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-prettier': Extension.Module
  }
}

const extension: Extension.Module = {
  name: '@roots/bud-prettier',
}

export const {name} = extension
