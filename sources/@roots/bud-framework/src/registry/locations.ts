/**
 * Registered locations
 *
 * @virtual @public
 */
export interface Locations {
  '@dist': string
  '@modules': string
  '@src': string
  '@storage': string
}

export type Registry = {
  [P in keyof Locations as `location.${P & string}`]: Locations[P]
}
