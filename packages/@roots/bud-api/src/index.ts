/**
 * `@roots/bud` is a frontend build framework combining the best parts
 * of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `@roots/bud-api` package provides the {@link Api Api Service}, a repository of macros/facades
 * facilitating common config tasks.
 *
 * @packageDocumentation
 */

import {Repository} from './repository'

declare module '@roots/bud-framework' {
  interface Framework extends Repository {}
}

export {Api} from './Api'

export * as repository from './repository'

export type {Repository} from './repository'
