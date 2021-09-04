/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * The `@roots/bud-emotion` package adds emotioncss support to [bud](https://github.com/roots/bud)
 *
 * @packageDocumentation
 */

import {BudEmotionExtension} from './BudEmotionExtension'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-emotion': BudEmotionExtension
    }
  }
}

export const {name, boot} = BudEmotionExtension
