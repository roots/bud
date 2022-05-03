import {Bud} from '../bud'

export type Options<T = any> = {
  [K in keyof T as `${K & string}`]?: T[K]
}

export namespace Options {
  export type FuncMap<T = any> = Options<{
    [K in keyof T as `${K & string}`]?: (app?: Bud) => T[K]
  }>

  export type Seed<T = any> = Options<{
    [K in keyof T as `${K & string}`]?: ((app?: Bud) => T[K]) | T[K]
  }>
}
