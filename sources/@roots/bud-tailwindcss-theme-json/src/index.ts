// Copyright © Roots Software LLC
// Licensed under the MIT license.

/**
 * Adds tailwind support to `@roots/bud-wordpress-theme-json`.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss-theme-json'?: any
  }
}

export {TailwindThemeJSON as default} from '@roots/bud-tailwindcss-theme-json/extension'
