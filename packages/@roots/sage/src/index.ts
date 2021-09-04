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
 * The `@roots/sage` preset configures the `@roots/bud` framework
 * for the [Sage WordPress theme](https://git.io/vlxDC).
 *
 * @export {name} - The name of the extension
 * @export {boot} - The extension boot function
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import {sage} from './sage'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/sage': sage
    }
  }
}

export const {name, boot} = sage
