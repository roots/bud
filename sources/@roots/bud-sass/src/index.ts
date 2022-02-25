/**
 * Add sass support to Bud projects
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Item, Loader, Rule} from '@roots/bud-build'

import {extension} from './sass.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-sass': extension
  }

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

export const {name, boot, register} = extension
