import {Bud} from '../../bud.js'

export interface Base {
  get app(): Bud

  wrap<T = any>(input: T | ((app: Bud) => T)): (app: Bud) => T

  unwrap<T = any>(
    input: T | ((app: Bud, ...options: Array<any>) => T),
    ...options: Array<any>
  ): T
}
