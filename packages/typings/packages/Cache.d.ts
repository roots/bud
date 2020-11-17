import {Bud} from '.'

export interface Contract {
  bud: Bud.Ref

  setCache(): void
}
