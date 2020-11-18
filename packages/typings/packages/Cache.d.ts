import {Bud} from '.'

export interface Contract {
  setCache(): void

  enabled(): boolean
}
