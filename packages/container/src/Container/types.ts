/**
 * A basic container object.
 */
export interface Container<T = any> {
  repository: Repository<T>

  getStore: () => Repository<T>

  setStore: (repository: Repository<T>) => this

  get: (key: string) => any

  getEntries: (key?: string) => [string, unknown][]

  getValues: (key?: string) => unknown[]

  getKeys: (key?: string) => unknown[]

  getMap: (key?: string) => Map<string, Repository<T>>

  /**
   * @deprecated
   */
  all: () => Repository<T>

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
