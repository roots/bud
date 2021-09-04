/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @export {name} The extension name
 * @export {api} The extension API
 * @export {boot} The extension boot function
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import {Item, Loader, Rule} from '@roots/bud-build'
import {Module, WebpackPlugin} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {typecheck} from './api'
import {BudTypeScriptExtension} from './BudTypeScriptExtension'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Enable typescript type checking
     *
     * @usage
     * ```js
     * bud.typecheck()
     * ```
     */
    typecheck: typecheck
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-typescript': Module
      'fork-ts-checker-plugin': WebpackPlugin<
        typeof ForkTsCheckerWebpackPlugin
      >
    }

    interface Loaders {
      ts: Loader
    }

    interface Items {
      ts: Item
    }

    interface Rules {
      ts: Rule
    }
  }
}

export const {name, boot, api} = BudTypeScriptExtension
