export type RuntimeChunk =
  | 'multiple'
  | 'single'
  | {name?: Function | string}
  | boolean
