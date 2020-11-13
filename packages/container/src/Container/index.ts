import _ from 'lodash'

export class Container {
  repository: Container.Repository

  value: unknown

  constructor(repository: Container.Repository) {
    this.repository = repository
  }

  public getStore(): Container.Repository {
    return this.repository
  }

  public setStore<T>(repository: Container.Repository<T>): this {
    this.repository = repository

    return this
  }

  public get<I = any>(key: string | number): I {
    this.value = _.get(this.repository, key)
    return this.value as I
  }

  public length(key: string | number): number {
    return (key
      ? this.get<Array<any>>(key)
      : (this.value as any[])
    ).length
  }

  public set<I = any>(key: number | string, value: I): this {
    _.set(this.repository, key, value)

    return this
  }

  /**
   * @todo make this safer.
   */
  public mutate<I = any>(
    key: string | number,
    mutationFn: (value?: I) => I | unknown,
  ): this {
    const mutatedValue = mutationFn(
      key ? this.get(key) : (this.repository as I),
    )

    key
      ? this.set(key, mutatedValue)
      : this.setStore(mutatedValue as {[key: string]: I})

    return this
  }

  public has(key: number | string): boolean {
    return this.repository[key] ? true : false
  }

  public delete(key: number | string): this {
    delete this.repository[key]

    return this
  }

  public entries: Container.Transform<
    Array<[string, Container.Item]>
  > = function () {
    return (this.value = Object.entries(this.getStore()))
  }

  public keys: Container.Transform<string[]> = function () {
    return (this.value = Object.keys(this.getStore()))
  }

  public values: Container.Transform<
    Container.Item[]
  > = function (key) {
    return (this.value = key
      ? Object.values(key)
      : Object.values(this.getStore()))
  }

  public Map: Container.Transform<
    Map<string, Container.Item>
  > = function () {
    return this.all().reduce(
      (
        map: Map<string, Container.Repository>,
        [key, value]: [string, Container.Repository],
      ) => map.set(key, value),
      new Map(),
    )
  }

  public isIndexed(key?: string | number): boolean {
    const value = key ? this.get(key) : this.value
    return _.isObject(value) && !_.isArrayLikeObject(value)
  }

  public isArray(key: string | number): boolean {
    return _.isArray(this.get(key))
  }

  public asArray(key?: string): any[] {
    return _.toArray(key ? this.get(key) : this.value)
  }

  public use(key: string): this {
    this.value = this.get(key)
    return this
  }

  public asEntries(
    key?: string,
  ): [string | number, unknown] | [string | number, unknown][] {
    const value = Object.entries(
      key ? this.get(key) : this.value ?? this.repository,
    )

    this.value = null
    return value
  }

  public asValues(key?: string): unknown[] {
    const value = Object.values(
      key ? this.get(key) : this.value ?? this.repository,
    )

    this.value = null
    return value
  }

  public asKeys(key?: string): unknown[] {
    const value = Object.keys(
      key ? this.get(key) : this.value ?? this.repository,
    )

    this.value = null
    return value
  }

  public isString(key: string | number): boolean {
    return _.isString(this.get(key))
  }

  public isNumber(key: string | number): boolean {
    return _.isNumber(this.get(key))
  }
}
