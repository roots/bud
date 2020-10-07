import Container from '@roots/container'

export declare interface Store {
  state: Container
  create: Store.Create
  query: Store.Query
  merge: Store.Merge
  use: Store.Use
  get: Store.Get
  set: Store.Set
}

export declare namespace Store {
  /**
   * Store objects keyed by string.
   *
   * @note Objects will be containerized in the
   * do not call new Container() before passing.
   *
   */
  export interface Constructor {
    [key: string]: {
      [key: string]: any
    }
  }

  /**
   * The store repository
   *
   * @type {Container}
   * @memberof Store
   */
  export type State = {
    [key: string]: Container
  }

  /**
   * Get the state from an array of store keys
   */
  export type Use = (name: string) => Container

  export type Get = (
    name: string,
    query: string | string[],
  ) => Container[]

  export type Set = (
    name: string,
    query: string | string[],
    val: unknown,
  ) => Container[]

  export type Query = (name: string[]) => Container[]

  export type Create = (
    name: string,
    repo: Container['repository'],
  ) => void

  export type Merge = (
    name: string,
    repo: Container['repository'],
  ) => void
}
