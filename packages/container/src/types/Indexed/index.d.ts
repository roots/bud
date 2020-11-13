import {Container} from '../'

export declare class Indexed<T = any> extends Container {
  repository: Container.KeyedRepository

  constructor(repository?: Container.KeyedRepository<T>)

  /**
   * Push an entry onto an arrayed repository item.
   */
  push: Container.Using

  /**
   * Conditional check that repository item matches value.
   */
  is: Container.Conditional

  /**
   * Conditional check that item is true.
   */
  isTrue: Container.Conditional

  /**
   * Conditional check that item is truth-adjacent.
   */
  isTruthy: Container.Conditional

  /**
   * Conditional check that item key exists
   */
  has: Container.Conditional

  /**
   * Merge values onto a repository item.
   */
  merge: Container.Using

  /**
   * For a boolean item, set to true.
   */
  enable: Container.Select

  /**
   * For a boolean item, set to false.
   */
  disable: Container.Select

  /**
   * Check that a boolean value is true.
   */
  enabled: Container.Conditional

  /**
   * Check that a boolean value is false.
   */
  disabled: Container.Conditional

  /**
   * Returns a function
   */
  map<I = any, O = I>(item: I): O

  /**
   * Do something with each item in the repository
   */
  each(key: string, handler: any): this

  /**
   * Return the entire repository contents
   */
  all: Container.Transform

  /**
   * Completely replace the repository values.
   */
  setRepository: (value: Container.Repository) => this

  /**
   * Return repository contents as a tuple (object.entries)
   */
  entries: Container.Transform<Array<[string, Container.Item]>>

  /**
   * Return the repository keys (object.keys)
   */
  keys: Container.Transform<string[]>

  /**
   * Return the repository values (object.values)
   */
  values: Container.Transform<Container.Item[]>

  /**
   * Return an ES6 of the repository.
   */
  Map: Container.Transform<Map<string, Container.Item>>
}
