import _ from 'lodash'
import {instance} from '../instance'
import {Container} from '../Container'

export class Indexed extends Container {
  repository: Container.KeyedRepository

  constructor(repository?: Container.KeyedRepository) {
    super(repository || {})

    Object.getOwnPropertyNames(this)
      .filter(name => name !== 'repository')
      .forEach(name =>
        Object.defineProperty(this, name, {enumerable: false}),
      )

    return instance.bind(this)()
  }

  public push(key: string, item: Container.Item): void {
    this.repository[key].push(item)
  }

  public get: Container.Get = function (key: string) {
    return _.get(this.repository, key)
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

  public set: Container.Using = function (key, value) {
    _.set(this.repository, key, value)
  }

  public has: Container.Conditional = function (key) {
    return this.get(key) ? true : false
  }

  public merge: Container.Using = function (key, value) {
    this.set(key, _.merge(this.get(key), value))
  }

  public delete: Container.Select = function (key) {
    delete this.repository[key]
  }

  public enable: Container.Select = function (key) {
    this.repository[key] = true
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
  > = function (handler: (item: unknown) => unknown) {
    return this.entries().map(handler)
  }

  public each: Container.IterateUsing = function (key, handler) {
    Object.values(this.get(key)).forEach(handler)
  }

  public all: Container.Transform = function () {
    return this.repository
  }

  public entries: Container.Transform<
    Array<[string, Container.Item]>
  > = function () {
    return Object.entries(this.repository)
  }

  public keys: Container.Transform<string[]> = function () {
    return Object.keys(this.repository)
  }

  public values: Container.Transform<
    Container.Item[]
  > = function () {
    return Object.values(this.repository)
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
}
