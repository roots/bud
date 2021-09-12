// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * The `@roots/bud-build` core implementation
 *
 * @packageDocumentation @core
 */

export {Build} from './Build'
export {Item} from './Item'
export {Rule} from './Rule'
export {Loader} from './Loader'
export {config} from './Build/config'

export * as items from './Build/items'
export * as rules from './Build/rules'
export * as loaders from './Build/loaders'
