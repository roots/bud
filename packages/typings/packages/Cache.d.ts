import {Bud} from '.'

export interface Contract {
  bud: Bud.Contract

  setCache(): void
}
