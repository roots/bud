/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-extensions" />
/// <reference types="@roots/bud-terser" />

import type {Repository} from './repository.js'

declare module '@roots/bud-framework' {
  interface Bud extends Repository {}
}
