/**
 * ESBuild support for Bud projects
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @beta
 * This plugin is much more limited in terms of supporting essential dev-focused features
 * like hot-reloading. It is provided as-is for use in Bud projects. It is not currently a focus
 * of our development efforts.
 *
 * @remarks
 * If you would like to contribute to the development of this plugin (especially if you have experience
 * with module reloading in an ESBuild context), please open an issue on Github.
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {Factory} from '@roots/bud-framework'
import {Framework} from '@roots/bud-framework'
import {Index} from '@roots/bud-framework'
import {Maybe} from '@roots/bud-framework'

export declare const api: Maybe<[Framework], Index<unknown>>

export declare const boot: Factory<[Framework], unknown>

declare const name_2: string
export {name_2 as name}

export declare const options: unknown

export {}
