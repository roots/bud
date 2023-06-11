/**
 * Registered locations
 *
 * @virtual @public
 */
export interface Locations {
  '@dist': string
  '@modules': string
  '@os-cache': string
  '@os-config': string
  '@os-data': string
  '@os-log': string
  '@os-temp': string
  '@src': string
  '@storage': string
}

export type Registry = {
  [P in keyof Locations as `location.${P & string}`]: Locations[P]
}
