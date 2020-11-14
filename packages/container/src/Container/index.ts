import _ from 'lodash'

export type Repository = {[key: string]: any}

export class Container {
  public repository: {[key: string]: any}

  constructor(repository: Repository) {
    this.setStore(repository ?? {})
  }

  public getStore(): Repository {
    return this.repository
  }

  public setStore(repository: Repository): this {
    this.repository = repository

    return this
  }

  public get(key: string): any {
    return _.get(this.repository, key)
  }

  public getEntries(key?: string): [string, unknown][] {
    return Object.entries(key ? this.get(key) : this.getStore())
  }

  public getValues(key?: string): unknown[] {
    return Object.values(key ? this.get(key) : this.getStore())
  }

  public getKeys(key?: string): unknown[] {
    return Object.keys(key ? this.get(key) : this.getStore())
  }

  public getMap(key?: string): Map<string, Repository> {
    const value = key ? this.get(key) : this.getStore()

    return value.reduce(
      (
        map: Map<string, Repository>,
        [key, value]: [string, Repository],
      ) => map.set(key, value),
      new Map(),
    )
  }

  /**
   * @deprecated
   */
  public all(): Repository {
    return this.getStore()
  }

  public length(key: string): number | boolean {
    return this.get(key)?.length
  }

  public set(key: string, value: any): this {
    _.set(this.repository, key, value)

    return this
  }

  /**
   * @todo make this safer.
   */
  public mutate(
    key: string,
    mutationFn: (value?: any) => any,
  ): any {
    this.set(
      key,
      mutationFn(key ? this.get(key) : this.getStore()),
    )
  }

  public merge(key: string, value: any): this {
    key
      ? this.set(key, _.merge(this.get(key), value))
      : this.setStore(_.merge(this.getStore(), value))

    return this
  }

  public has(key: string): boolean {
    return this.repository[key] ? true : false
  }

  public delete(key: string): this {
    this.has(key) && delete this.repository[key]
    return this
  }

  public is(key: string, value: any): boolean {
    return this.get(key) === value
  }

  public isTrue(key: string): boolean {
    return this.is(key, true)
  }

  public isFalse(key: string): boolean {
    return this.is(key, false)
  }

  public enabled(key: string): boolean {
    return this.isTrue(key)
  }

  public disabled(key: string): boolean {
    return this.isFalse(key)
  }

  public isIndexed(key?: string): boolean {
    const value = key ? this.get(key) : this.getStore()
    return _.isObject(value) && !_.isArrayLikeObject(value)
  }

  public isArray(key: string): boolean {
    return _.isArray(this.get(key))
  }

  public isString(key: string): boolean {
    return _.isString(this.get(key))
  }

  public isNumber(key: string): boolean {
    return _.isNumber(this.get(key))
  }
}
