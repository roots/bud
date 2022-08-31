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

export type Sync = Locations

export type SyncRegistry = {
  [P in keyof Sync as `location.${P & string}`]: Sync[P]
}
