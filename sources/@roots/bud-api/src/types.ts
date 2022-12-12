/// <reference path="../../bud-framework/lib/index.d.ts" />
/// <reference path="../../bud-extensions/lib/index.d.ts" />
/// <reference path="../../bud-terser/lib/index.d.ts" />

import type {Repository} from './repository.js'

declare module '@roots/bud-framework' {
  interface Bud extends Repository {}
}
