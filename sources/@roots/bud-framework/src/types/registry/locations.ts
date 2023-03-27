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
  '@tmp': string
}

export type Registry = {
  [P in keyof Locations as `location.${P & string}`]: Locations[P]
}
