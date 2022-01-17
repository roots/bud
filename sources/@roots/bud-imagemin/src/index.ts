// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Add image optimization support to Bud projects
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'

import {imagemin} from './imagemin.config'
import * as BudImagemin from './imagemin.extension'

declare module '@roots/bud-framework' {
  interface Framework {
    imagemin: imagemin
  }

  interface Modules {
    '@roots/bud-imagemin': typeof BudImagemin
  }
}

/**
 * Extension name
 *
 * @public
 */
export const name: Extension.Module['name'] = BudImagemin.name

/**
 * Extension options
 *
 * @public
 */
export const options: Extension.Module['options'] = BudImagemin.options

/**
 * Extension api
 *
 * @public
 */
export const api: {imagemin: imagemin} = BudImagemin.api

/**
 * Extension boot
 *
 * @public
 */
export const boot: Extension.Module['boot'] = BudImagemin.boot
