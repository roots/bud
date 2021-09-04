/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 *
 * @remarks
 * Add React to Bud projects
 *
 * @export {name} Extension name
 * @export {boot} Extension boot function
 * @export {BudReactExtension} Extension object
 * @export {BudReactRefreshPlugin} Plugin object
 * @export {reactRefresh} configuration function for plugin
 *
 * @packageDocumentation
 */

import {BudReactExtension} from './BudReactExtension'
import {BudReactRefreshPlugin} from './BudReactRefreshPlugin'
import {reactRefresh} from './reactRefresh'

declare module '@roots/bud-framework' {
  interface Framework {
    reactRefresh: reactRefresh
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-react': BudReactExtension
      '@pmmmwh/react-refresh-webpack-plugin': BudReactRefreshPlugin
    }
  }
}

export const {name, boot} = BudReactExtension
export {BudReactExtension}
export {BudReactRefreshPlugin}
export {reactRefresh}
