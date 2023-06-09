export type RuntimeChunk =
  | boolean
  | 'single'
  | 'multiple'
  | {name?: string | Function}
