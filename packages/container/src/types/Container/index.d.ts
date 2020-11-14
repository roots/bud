/**
 * A basic container object.
 */
export interface Container {
  repository: {[key: string]: any}

  constructor(repository: Repository)

  getStore: () => Repository

  setStore: (repository: Repository) => this

  get: (key: string) => any

  getEntries: (key?: string) => [string, unknown][]

  getValues: (key?: string) => unknown[]

  getKeys: (key?: string) => unknown[]

  getMap: (key?: string) => Map<string, Repository>

  /**
   * @deprecated
   */
  all: () => Repository

  length: (key: string) => number | boolean

  set: (key: string, value: any) => this

  mutate: (key: string, mutationFn: (value?: any) => any) => any

  has: (key: string) => boolean

  delete: (key: string) => this

  is: (key: string, value: any) => boolean

  isTrue: (key: string) => boolean

  isFalse: (key: string) => boolean

  enabled: (key: string) => boolean

  disabled: (key: string) => boolean

  isIndexed: (key?: string) => boolean

  isArray: (key: string) => boolean

  isString: (key: string) => boolean

  isNumber: (key: string) => boolean
}

/**
 * Container iem.
 */
export type Item<T = any> = T

/**
 * Indexed container value store.
 */
export type Repository<T = any> = {
  [key: string]: Item<T>
}

/**
 * Do something with a repository item.
 */
export type Using = (key: string, value: Item) => void

/**
 * Do a conditional check against a repository item by key.
 */
export type Conditional = (
  key: string,
  comparison?: any,
) => boolean

/**
 * Do something with a repository item by key.
 */
export type Select = (key: string) => void

/**
 * Get a repository item by key.
 */
export type Get = (key: string | string[]) => Item

/**
 * Handler for iterable methods.
 */
export type Handler = (params: any) => any

/**
 * Do something
 */
export type IterateUsing = (key: string, handler: Handler) => any

/**
 * Transform a repository item.
 */
export type Transform<T = any> = (args?: any) => T
