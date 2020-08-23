import {existsSync} from 'fs-extra'
import {logger} from './util/logger'
import {get as _get, set as _set} from 'lodash'

import {
  Container,
  FileContainer,
  ExtensionContainer,
  ContainerInterface,
  FileContainerInterface,
  ExtensionContainerInterface,
  ContainerBind,
  Repository,
  RepositoryDefinition,
  Key,
  Getter,
  Action,
  ConditionalCheck,
} from './container.d'

const newContainer: Action = function (key, repository = {}) {
  this.repository[key] = new container(repository)
}

const add: Action = function (entry) {
  this.repository.push(entry)
}

const get: Getter = function (key) {
  return _get(this.repository, key)
}

const is: ConditionalCheck = function (key, value) {
  return this.get(key) == value
}

const containerRequire = function (key) {
  const module = this.get(key)

  require(module)
}

const set: Action = function (key, value) {
  logger.info({name: 'container', key, value}, `${this.name}.set`)
  _set(this.repository, key, value)
}

const has: ConditionalCheck = function (key) {
  return this.repository.hasOwnProperty(key) ? true : false
}

const merge: Action = function (key, value) {
  this.repository[key] = (this.repository[key] as any)
    ? {...this.repository[key], ...value}
    : (this.repository[key] as any[])
    ? [...this.repository[key], ...value]
    : [this.repository[key], value]
}

const containerMethodDelete: Action = function (key) {
  delete this.repository[key]
}

const exists: ConditionalCheck = function (key) {
  return existsSync(this.repository[key])
}

const enable: Action = function (key) {
  logger.info(
    {name: 'container', key, value: true},
    `${this.name}.enable`,
  )

  this.repository[key] = true
}

const disable: Action = function (key) {
  logger.info(
    {name: 'container', key, value: false},
    `${this.name}.disable`,
  )

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
  this.get = get
  this.has = has
  this.set = set
  this.map = map
  this.entries = entries
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
const registerExtensionContainer: ContainerBind = function (
  store: RepositoryDefinition,
): ExtensionContainer {
  const instance = new container(store.register, store.name)

  instance.add = add

  return instance
}

export {
  container,
  registerContainer,
  registerFileContainer,
  registerExtensionContainer,
}

export {
  Container,
  FileContainer,
  ExtensionContainer,
  ContainerInterface,
  FileContainerInterface,
  ExtensionContainerInterface,
  ContainerBind,
  Repository,
  RepositoryDefinition,
  Key,
  Getter,
  Action,
  ConditionalCheck,
}
