// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-compiler
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import {default as Compiler} from '@roots/bud-compiler/service'

declare module '@roots/bud-framework' {
  interface Services {
    compiler: Compiler
  }
}

export {Compiler as default}
