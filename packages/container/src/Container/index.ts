import _ from 'lodash'

export class Container {
  repository: Container.Repository

  constructor(repository: Container.Repository) {
    this.repository = repository
  }

  public get: Container.Get = function (key: string | number) {
    return _.get(this.repository, key)
  }

  public set: Container.Using = function (
    key: number | string,
    value: unknown,
  ) {
    _.set(this.repository, key, value)
  }

  public mutate = function (
    key: string | number,
    mutationFn: (unknown) => unknown,
  ): void {
    this.set(key, mutationFn(this.get(key)))
  }

  public has: Container.Conditional = function (
    key: number | string,
  ): boolean {
    return this.repository.hasOwnProperty(key)
  }

  public delete: Container.Using = function (
    key: number | string,
  ) {
    delete this.repository[key]
  }
}
