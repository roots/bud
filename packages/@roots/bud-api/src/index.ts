// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * The {@link @roots/bud-api# | @roots/bud-api package} is a repository of high-level functions
 * intended to make common configuration goals easier to accomplish.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @core @packageDocumentation @betaDocumentation
 */

import {Api, Repository} from './Api'

declare module '@roots/bud-framework' {
  interface Framework extends Repository {}
}

export {Api, Repository}
