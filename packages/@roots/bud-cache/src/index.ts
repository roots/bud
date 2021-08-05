/**
 * `@roots/bud` is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `@roots/bud-cache` package provides {@link Cache Cache}, a concrete implementation of the {@link Contract Cache interface} defined in
 * `@roots/bud-framework`.
 *
 * @packageDocumentation
 */

import {Cache as Contract} from '@roots/bud-framework'

import {Cache} from './Cache'

export {Cache, Cache as default, Contract}
