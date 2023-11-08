export type RuntimeChunk =
  | 'multiple'
  | 'single'
  | {name?: ((...args: Array<unknown>) => unknown) | string}
  | boolean
