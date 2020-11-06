export as namespace Container

/**
 * A basic container object.
 */
export declare class Container {
  /**
   * Store.
   */
  repository: Container.Repository

  /**
   * Class constructor.
   */
  constructor(repository?: Container.Repository)

  /**
   * Get an item from the repo.
   */
  public get: Container.Get

  /**
   * Set an item on the repo.
   */
  public set: Container.Using

  /**
   * Check if an item exists in the repo.
   */
  public has: Container.Conditional

  /**
   * Delete an item from the repo.
   */
  public delete: Container.Select

  /**
   * Overwrite a repository value with the result of a callback.
   */
  public mutate: (
    key: string | number,
    mutationFn: (any) => any,
  ) => any
}

/**
 * Common container
 */
/**
 * Container iem.
 */
export type Item = any | Repository | Repository[]

/**
 * Container value store.
 */
export type Repository = KeyedRepository | ArrayedRepository

/**
 * Indexed container value store.
 */
export type KeyedRepository = {
  [key: string]: Item
}

/**
 * Arrayed container value store.
 */
export type ArrayedRepository = Array<any>

/**
 * Do something with a repository item.
 */
export type Using = (key: string | number, value: Item) => void

/**
 * Do a conditional check against a repository item by key.
 */
export type Conditional = (
  key: string | number,
  comparison?: any,
) => boolean

/**
 * Do something with a repository item by key.
 */
export type Select = (key: string | number) => void

/**
 * Get a repository item by key.
 */
export type Get = (key: string | number) => Item

/**
 * Handler for iterable methods.
 */
export type Handler = (params: unknown) => unknown

/**
 * Do something
 */
export type IterateUsing = (
  key: string | number,
  handler: Handler,
) => unknown

/**
 * Transform a repository item.
 */
export type Transform<T = any> = (args?: any) => T
