// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * The `@roots/bud-emotion` package adds emotioncss support to Bud.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {EmotionExtension} from './emotion.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': EmotionExtension
  }
}

export {boot, name} from './emotion.extension'
