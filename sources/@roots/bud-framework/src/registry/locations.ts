/**
 * Registered locations
 *
 * @virtual @public
 */
export interface Locations {
  '@src': string
  '@dist': string
  '@storage': string
  '@modules': string
}

export namespace Locations {
  export type HookMap = {
    [K in keyof Locations as `location.${K & string}`]: Locations[K]
  }
}
