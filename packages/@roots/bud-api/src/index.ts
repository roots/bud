// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Repository of high-level facades
 * which simplify common configuration tasks
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import {Repository} from './Repository'

declare module '@roots/bud-framework' {
  interface Framework extends Repository {}
}

export {Api} from './Api'
export {Repository} from './Repository'
