import type * as Framework from '@roots/bud-framework'

declare module '@roots/bud/bud' {
  interface Bud extends Framework.Bud {}
  interface Locations extends Framework.Locations {}
  interface Modules extends Framework.Modules {}
}
