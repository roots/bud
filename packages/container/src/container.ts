import __ from 'lodash'

export interface Loose {
  [key: string]: any | any[] | Loose | Loose[]
}

export type Getter = (this: Container, key: string) => Loose
export type Action = (this: Container, ...args: any) => void

export type ConditionalCheck = (
  this: Container,
  key: string,
  value?: any,
) => boolean

class Container implements Loose {
  repository: Loose

  constructor(repository?: Loose) {
    this.repository = repository || {}

    this.add = this.add.bind(this)
    this.push = this.push.bind(this)
    this.get = this.get.bind(this)
    this.is = this.is.bind(this)
    this.set = this.set.bind(this)
    this.has = this.has.bind(this)
  }

  add: Action = function (
    this: Container,
    key: string,
    item: any,
  ): void {
    this.repository[key].push(item)
  }

  push: Action = function (this: Container, item: any) {
    this.repository.push(item)
  }

  get(this: Container, key: string): any {
    return __.get(this.repository, key)
  }

  is: ConditionalCheck = function (
    this: Container,
    key: string,
    value: any,
  ) {
    return this.get(key) == value
  }

  set: Action = function (
    this: Container,
    key: string,
    value: any,
  ) {
    __.set(this.repository, key, value)
  }

  has: ConditionalCheck = function (
    this: Container,
    key: string,
  ) {
    return this.repository.hasOwnProperty(key) ? true : false
  }

  merge: Action = function (
    this: Container,
    key: string,
    value: any,
  ) {
    this.set(key, __.merge(this.get(key), value))
  }

  deleteBind: Action = function (this: Container, key: string) {
    delete this.repository[key]
  }

  enable: Action = function (this: Container, key: string) {
    this.repository[key] = true
  }

  disable: Action = function (this: Container, key: string) {
    this.repository[key] = false
  }

  enabled: ConditionalCheck = function (
    this: Container,
    key: string,
  ) {
    return this.is(key, true)
  }

  disabled: ConditionalCheck = function (
    this: Container,
    key: string,
  ) {
    return this.is(key, false)
  }

  map: Action = function (
    this: Container,
    key: string,
    callback: (params: any) => any,
  ): any {
    return this.get(key).map(callback)
  }

  entries: (this: Container) => Loose = function () {
    return Object.entries(this.repository)
  }

  requireBind: Action = function (this: Container, key: string) {
    require.resolve(this.get(key)) && require(this.get(key))
  }
}

export {Container as default}
