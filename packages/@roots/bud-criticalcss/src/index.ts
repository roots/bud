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
 * The `@roots/bud-criticalcss` package adds criticalcss support to [@roots/bud](https://github.com/roots/bud)
 *
 * @packageDocumentation
 */

import {BudCriticalCssPlugin} from './BudCriticalCssPlugin'
import {critical} from './critical'

declare module '@roots/bud-framework' {
  interface Framework {
    critical: critical
  }

  interface Plugins {
    '@roots/bud-criticalcss': BudCriticalCssPlugin
  }
}

export const {api, make, name, options} = BudCriticalCssPlugin
