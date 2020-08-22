import {Loose} from '@roots/bud-typings'
import {existsSync} from 'fs-extra'
import {logger} from './util/logger'
import {get as _get, set as _set} from 'lodash'

import type {ExtensionControllerFactory} from './extensionFactory'
import {Bud} from './'

type Repository = any[] | any

type RepositoryDefinition = {
  repository: string
  contents: Repository
}

type Key = string
type Getter = (this: Container, key?: Key) => any
type Action = (this: Container, ...args: any) => void
type ConditionalCheck = (
  this: Container,
  key: Key,
  value?: any,
) => boolean

interface ContainerInterface extends Loose {
  name: string
  repository: Repository
  new: Action
  get: Getter
  require: () => void
  has: ConditionalCheck
  is: ConditionalCheck
  set: Action
  map: Action
  entries: Getter
  merge: Action
  delete: Action
  enable: Action
  enabled: ConditionalCheck
  disable: Action
  disabled: ConditionalCheck
}

interface FileContainerInterface extends ContainerInterface {
  require: Getter
  exists: ConditionalCheck
}

interface ExtensionContainer extends ContainerInterface {
  add: Action
}

type Container = ContainerInterface
type FileContainer = FileContainerInterface

type ContainerBind = (
  repository: Repository,
  bud: Bud,
) => Container | FileContainer | ExtensionContainer

const log = (
  repository: string,
  data?: Loose,
  message?: string,
): void => {
  logger.info(
    {name: 'container', repository, ...(data || {})},
    message,
  )
}

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

const normalStoreContents = (contents, bud) =>
  typeof contents === 'function' ? contents(bud) : contents

/**
 * Bind container.
 */
const makeContainer: ContainerBind = function (
  store,
  bud,
): Container {
  store.contents = normalStoreContents(store.contents, bud)
  log(store.repository, {store}, `create extension container`)

  return new container(store.contents, store.repository)
}

/**
 * Bind file container.
 */
const makeFileContainer: ContainerBind = function (
  store,
  bud,
): FileContainer {
  store = normalStoreContents(store.contents, bud)
  log(store.repository, {store}, `create container`)

  const instance = new container(store.contents, store.repository)
  instance.require = containerRequire
  instance.exists = exists

  return instance
}

/**
 * Bind extension container.
 */
const makeExtensionContainer: ContainerBind = function (
  store,
  bud,
): ExtensionContainer {
  store = normalStoreContents(store.contents, bud)
  log(store.repository, {store}, `create extension container`)

  const instance = new container(store.contents, store.repository)
  instance.add = add

  return instance
}

export {
  container,
  makeContainer,
  makeFileContainer,
  makeExtensionContainer,
}

export type {
  Container,
  FileContainer,
  ExtensionContainer,
  Repository,
  RepositoryDefinition,
}
