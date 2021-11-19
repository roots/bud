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
 * @extension @packageDocumentation @betaDocumentation
 */

import {Factory} from '@roots/bud-framework'
import {Framework} from '@roots/bud-framework'
import {Index} from '@roots/bud-framework'
import {Maybe} from '@roots/bud-framework'

export declare const api: Maybe<[Framework], Index<unknown>>

export declare const boot: Factory<[Framework], unknown>

export declare class Config {
  _app: () => Framework
  get app(): Framework
  constructor(app: Framework)
  plugins(plugins: [string, any][]): Framework
}

declare const name_2: string
export {name_2 as name}

export declare const register: Factory<[Framework], unknown>

export {}
