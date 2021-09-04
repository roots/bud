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
 * Add sass support to Bud projects
 *
 * @export {name} - The name of the extension
 * @export {boot} - The extension boot function
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import type {Item, Loader, Rule} from '@roots/bud-build'

import {BudSassExtension} from './BudSassExtension'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-sass': BudSassExtension
    }
  }

  namespace Framework {
    interface Loaders {
      sass: Loader
    }

    interface Items {
      sass: Item
    }

    interface Rules {
      sass: Rule
    }
  }
}

export const {name, boot} = BudSassExtension
