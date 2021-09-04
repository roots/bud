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
 * Add solid.js support to Bud projects
 *
 * @export {name} The name of the extension
 * @export {boot} The service boot function
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import type {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-solid': Module
    }
  }
}

interface BudSolidExtension extends Module {}

const BudSolidExtension: BudSolidExtension = {
  name: '@roots/bud-solid',
  boot({babel, project}) {
    project.hasPeerDependency('solid-js') &&
      babel.setPreset('babel-preset-solid')
  },
}

export const {name, boot} = BudSolidExtension
