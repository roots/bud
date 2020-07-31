import {existsSync} from 'fs-extra'
import {controller} from '../state/plugins/controller'

type Repository = any[] | object

interface Loose {
  [key: string]: any
}
interface ContainerInterface extends Loose {
  repository: Repository
  new: (this: Container, key: string, repository: Repository) => void
  get: (this: Container, key: string) => any
  contents: (this: Container, key: string) => any
  has: (this: Container, key: string) => boolean
  is: (this: Container, key: string, value: any) => boolean
  set: (this: Container, key: string, value: any) => void
  map: (this: Container, args: any[]) => any
  entries: (this: Container) => Repository
  merge: (this: Container, key: string, value: any) => void
  delete: (this: Container, key: string) => void
  enable: (this: Container, key: string) => void
  enabled: (this: Container, key: string) => boolean
  disable: (this: Container, key: string) => void
  disabled: (this: Container, key: string) => boolean
}

interface FileContainerInterface extends ContainerInterface {
  contents: (this: Container, key: string) => any
  exists: (this: Container, key: string) => boolean
}

interface ExtensionContainer extends ContainerInterface {
  controller: (this: Container, args: any[]) => any
}

type Container = ContainerInterface
type FileContainer = FileContainerInterface

const newContainer = function (
  key: string,
  repository: Repository = {},
) {
  this.repository[key] = (repository as object)
    ? new container({})
    : new container([])
}

const get = function (key: string) {
  return this.repository[key]
}

const is = function (
  this: Container,
  key: string,
  value: any,
): boolean {
  return this.get(key) == value
}

const contents = function (key: string): any | null {
  return require(this.get(key))
}

const set = function (key: string, value: any) {
  this.repository[key] = value
}

const has = function (key: string): boolean {
  return this.repository[key] && this.repository[key] !== null ? true : false
}

const merge = function (key: string, value: any) {
  this.repository[key] = (this.repository[key] as object)
    ? {...this.repository[key], ...value}
    : (this.repository[key] as any[])
    ? [...this.repository[key], ...value]
    : [this.repository[key], value]
}

const containerMethodDelete = function (key: string) {
  delete this.repository[key]
}

const exists = function (key: string): boolean {
  return existsSync(this.repository[key])
}

const enable = function (key: string): void {
  this.set(key, true)
}

const disable = function (key: string): void {
  this.set(key, false)
}

const enabled = function (key: string): boolean {
  return this.is(key, true)
}

const disabled = function (key: string): boolean {
  return this.is(key, false)
}

const map = function (...params): any {
  return this.repository.map(...params)
}

const entries = function (): any {
  return this.repository
}

const container = function (this: Container, repository: Repository) {
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

const bindContainer: (repository: Repository) => Container =
  function (repository): Container {
    return new container(repository)
  }

const bindFileContainer: (repository: Repository) => FileContainer =
  function (repository): FileContainer {
    const store = new container(repository)
    store.contents = contents
    store.exists = exists

    return store
  }

const bindExtensionContainer: (repository: Repository) => ExtensionContainer =
  function (repository): ExtensionContainer {
    const store = new container(repository)
    store.controller = controller

    return store
  }

export {container, bindContainer, bindFileContainer, bindExtensionContainer}
export type {Container, FileContainer, ExtensionContainer, Repository}
