// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * The `@roots/bud-emotion` package adds emotioncss support to {@link @roots/bud-framework# | the Bud}
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-babel/types'
import '@roots/bud-react/types'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': BudEmotion
  }
}

import BudEmotion from './extension'
export default BudEmotion
