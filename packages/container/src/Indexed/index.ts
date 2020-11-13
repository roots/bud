import _ from 'lodash'
import {Container} from '../Container'

export class Indexed<T = any> extends Container {
  repository: Container.KeyedRepository<T>

  constructor(repository?: Container.KeyedRepository<T>) {
    super(repository || {})
  }

  public push(key: string, item: Container.Item): this {
    return this.mutate(key, val => ({...val, item}))
  }

  public is: Container.Conditional = function (key, value) {
    return this.get(key) == value
  }

  public isTrue: Container.Conditional = function (key) {
    return this.get(key) === true
  }

  public isTruthy: Container.Conditional = function (key) {
    return this.get(key) == true
  }

  public has: Container.Conditional = function (key) {
    return this.get(key) ? true : false
  }

  public merge: Container.Using = function (key, value) {
    this.set(key, _.merge(this.get(key), value))
  }

  public enable: Container.Select = function (key) {
    this.set(key, true)
  }

  public disable: Container.Select = function (key) {
    this.repository[key] = false
  }

  public enabled: Container.Conditional = function (key) {
    return this.is(key, true)
  }

  public disabled: Container.Conditional = function (key) {
    return this.is(key, false)
  }

  public map: Container.Transform<
    Container.Repository
  > = function (handler: (item: any) => any) {
    return this.entries().map(handler)
  }

  public each = function (
    key: string,
    handler: CallableFunction,
  ): void {
    this.get(key).forEach(handler)

    return this
  }

  public all(
    args?: Container.Repository,
  ): Container.Repository | this {
    return args ? this.setStore(args) : this.repository
  }
}
