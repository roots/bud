import {existsSync} from 'fs-extra'
import _ from 'lodash'

import {Loose} from '@roots/bud-typings'

export declare type Repository = {
  [key: string]: any | any[]
}

export declare type RepositoryDefinition = {
  name: string
  register: Repository
}

export declare type Key = string
export declare type MaybeCallable = any | ((any) => any) | any[]
export declare type Getter = (
  this: Container,
  key?: Key,
) => MaybeCallable
export declare type Action = (this: Container, ...args: any) => void
export declare type ConditionalCheck = (
  this: Container,
  key: Key,
  value?: any,
) => boolean

export declare interface ContainerInterface extends Loose {
  name: string
  repository: Repository
  new: Action
  get: Getter
  require: () => void
  addTo: Action
  has: ConditionalCheck
  is: ConditionalCheck
  set: Action
  map: Action
  entries: Getter
  push: Action
  merge: Action
  delete: Action
  enable: Action
  enabled: ConditionalCheck
  disable: Action
  disabled: ConditionalCheck
}

export declare interface FileContainerInterface
  extends ContainerInterface {
  require: Getter
  exists: ConditionalCheck
}

export declare interface PluginContainerInterface
  extends ContainerInterface {
  add: Action
}

export declare type Container = ContainerInterface
export declare type FileContainer = FileContainerInterface
export declare type PluginContainer = PluginContainerInterface

export declare type ContainerBind = (
  repository: Repository,
) => Container | FileContainer | PluginContainer

const newContainer: Action = function (key, repository = {}) {
  this.repository[key] = new container(repository)
}

const addTo: Action = function (key, item) {
  this.repository[key].push(item)
}

const push: Action = function (item) {
  this.repository.push(item)
}

const get: Getter = function (key) {
  return _.get(this.repository, key)
}

const is: ConditionalCheck = function (key, value) {
  return this.get(key) == value
}

const containerRequire = function (key) {
  require(this.get(key))
}

const set: Action = function (key, value) {
  _.set(this.repository, key, value)
}

const has: ConditionalCheck = function (key) {
  return this.repository.hasOwnProperty(key) ? true : false
}

const merge: Action = function (key, value) {
  _.merge(this.repository[key], value)
}

const containerMethodDelete: Action = function (key) {
  delete this.repository[key]
}

const exists: ConditionalCheck = function (key) {
  return existsSync(this.repository[key])
}

const enable: Action = function (key) {
  this.repository[key] = true
}

const disable: Action = function (key) {
  this.repository[key] = false
}

const enabled: ConditionalCheck = function (key) {
  return this.is(key, true)
}

const disabled: ConditionalCheck = function (key) {
  return this.is(key, false)
}

const map: Action = function (...params): any {
  return this.repository.map(...params)
}

const entries: Getter = function () {
  return this.repository
}

const container: Action = function (repository?, name = 'anonymous') {
  this.name = name
  this.repository = repository
  this.new = newContainer
  this.addTo = addTo
  this.get = get
  this.has = has
  this.set = set
  this.map = map
  this.entries = entries
  this.push = push
  this.merge = merge
  this.delete = containerMethodDelete
  this.is = is
  this.enable = enable
  this.enabled = enabled
  this.disable = disable
  this.disabled = disabled
}

/**
 * Bind container.
 */
const registerContainer: ContainerBind = function (
  store: RepositoryDefinition,
): Container {
  return new container(store.register, store.name)
}

/**
 * Bind file container.
 */
const registerFileContainer: ContainerBind = function (
  store: RepositoryDefinition,
): FileContainer {
  const instance = new container(store.register, store.name)

  instance.require = containerRequire
  instance.exists = exists

  return instance
}

/**
 * Bind extension container.
 */
const registerPluginContainer: ContainerBind = function (
  store: RepositoryDefinition,
): PluginContainer {
  const instance = new container(store.register, store.name)

  return instance
}

export {
  container,
  registerContainer,
  registerFileContainer,
  registerPluginContainer,
}
