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
 * Add image optimization support to Bud projects
 *
 * @export {name} - The name of the extension
 * @export {api} - The extension API
 * @export {register} - The extension registration function
 * @export {boot} - The extension boot function
 * @export {Config} - The extension configuration interface
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import {BudImageMinExtension} from './BudImageMinExtension'
import {BudImageMinPlugin} from './BudImageMinPlugin'
import {Config} from './Config'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-imagemin': BudImageMinPlugin
      'image-minimizer-webpack-plugin': BudImageMinPlugin
    }
  }

  interface Framework {
    /**
     * Manage image minimizer plugins and options
     */
    imagemin: Config
  }

  interface Extensions {
    '@roots/bud-imagemin'?: BudImageMinExtension
  }
}

export const {name, api, register, boot} = BudImageMinExtension
export type {Config}
