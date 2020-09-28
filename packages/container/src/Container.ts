import __ from 'lodash'
import {ContainerInterface, Item, Loose} from '.'

/**
 * Keyed item store.
 */
class Container implements ContainerInterface {
  repository: Loose

  constructor(repository?: Loose) {
    this.repository = repository || {}
  }

  /**
   * Push a new value onto an array item
   * @deprecated
   */
  public add(
    this: ContainerInterface,
    key: string,
    item: Item,
  ): void {
    this.repository[key].push(item)
  }

  /**
   * Push a new value onto an array item
   */
  public push(
    this: ContainerInterface,
    key: string,
    item: Item,
  ): void {
    this.repository[key].push(item)
  }

  /**
   * Get a value of a repository item.
   */
  public get(this: ContainerInterface, key: string): Item {
    return __.get(this.repository, key)
  }

  public is(
    this: ContainerInterface,
    key: string,
    value: Item,
  ): boolean {
    return this.get(key) == value
  }

  public set(
    this: ContainerInterface,
    key: string,
    value: Item,
  ): void {
    __.set(this.repository, key, value)
  }

  public has(this: ContainerInterface, key: string): boolean {
    return this.repository.hasOwnProperty(key) ? true : false
  }

  public merge(
    this: ContainerInterface,
    key: string,
    value: Item,
  ): void {
    this.set(key, __.merge(this.get(key), value))
  }

  public delete: ContainerInterface['delete'] = function (
    this: ContainerInterface,
    key: string,
  ) {
    delete this.repository[key]
  }

  public enable(this: ContainerInterface, key: string): void {
    this.repository[key] = true
  }

  public disable(this: ContainerInterface, key: string): void {
    this.repository[key] = false
  }

  public enabled(
    this: ContainerInterface,
    key: string,
  ): boolean {
    return this.is(key, true)
  }

  public disabled(
    this: ContainerInterface,
    key: string,
  ): boolean {
    return this.is(key, false)
  }

  public map(
    this: ContainerInterface,
    key: string,
    callback: (params: unknown) => unknown,
  ): unknown {
    return this.get(key).map(callback)
  }

  public each(
    this: ContainerInterface,
    callback: (value: any, index: number, array: any[]) => void,
    key?: string,
  ): unknown {
    return !key
      ? Object.values(this.repository).forEach(callback)
      : Object.values(this.get(key)).forEach(callback)
  }

  /**
   * Get all of the repository contents
   */
  public entries(): Loose {
    return Object.entries(this.repository)
  }
}

export {Container as default}
