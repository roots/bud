// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Add React to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @example
 * JavaScript:
 *
 * ```js
 * module exports = async bud => {
 *  await bud.use(require('@roots/bud-react'));
 * }
 * ```
 *
 * @example
 * Typescript:
 *
 * ```ts
 * import type {Bud} from '@roots/bud
 * import * as ReactExtension from '@roots/bud-react';
 *
 * export default (bud: Bud) => {
 *   bud.use(ReactExtension);
 * }
 * ```
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation @betaDocumentation
 */

import {BudReactExtension} from './BudReactExtension'
import {BudReactRefreshPlugin} from './BudReactRefreshPlugin'
import {reactRefresh} from './reactRefresh'

/**
 * Framework interface
 */

declare module '@roots/bud-framework' {
  interface Framework {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': BudReactExtension
  }

  interface CompilerPlugin {
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefreshPlugin
  }
}

/**
 * Export
 */

export const {name, boot} = BudReactExtension
