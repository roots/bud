import __ from 'lodash'

import '../types/Container'

class Container {
  repository: Container.Repository

  constructor(repository?: Container.Repository) {
    this.repository = repository || {}
  }

  public add: Container.Using = function (key, item): void {
    this.repository.push(item)
  }

  public push(key: string, item: Container.Item): void {
    this.repository[key].push(item)
  }

  public get: Container.Get = function (key: string) {
    return __.get(this.repository, key)
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
    __.set(this.repository, key, value)
  }

  public has: Container.Conditional = function (key) {
    return this.repository.hasOwnProperty(key) ? true : false
  }

  public merge: Container.Using = function (key, value) {
    this.set(key, __.merge(this.get(key), value))
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
  > = function (handler) {
    return this.entries().map(handler)
  }

  public each: Container.IterateUsing = function (key, handler) {
    Object.values(this.get(key)).forEach(handler)
  }

  public all: Container.Transform = function () {
    return this.repository
  }

  public entries: Container.Transform = function () {
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

export {Container as default}
