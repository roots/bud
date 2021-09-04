/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @export {BudTerserPlugin} The extension
 *
 * @export {name} The extension name
 * @export {api} The extension API
 * @export {boot} The extension boot function
 * @export {options} The extension options
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import {BudTerserPlugin} from './BudTerserPlugin'

declare module '@roots/bud-framework' {
  interface Framework {
    terser: BudTerserPlugin['api']['terser']
  }

  namespace Framework {
    interface Extensions {
      'terser-webpack-plugin': BudTerserPlugin
    }
  }
}

export {BudTerserPlugin}
export {name, options, api, boot} from './BudTerserPlugin'
