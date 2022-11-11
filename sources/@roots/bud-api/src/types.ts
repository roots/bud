/// <reference path="../../bud-framework/lib/index.d.ts" />
/// <reference path="../../bud-extensions/lib/index.d.ts" />
/// <reference path="../../bud-terser/lib/index.d.ts" />

import type {Facade} from './facade/facade.js'

declare module '@roots/bud-framework' {
  interface Bud extends Facade {}
}
