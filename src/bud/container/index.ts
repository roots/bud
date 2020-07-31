import {existsSync} from 'fs-extra'
import path from 'path'

type Repository = any[] | object

interface ContainerInterface {
  repository: Repository
  fs: typeof fs
  new: (this: Container, key: string, repository: Repository) => void
  get: (this: Container, key: string) => any
  contents: (this: Container, key: string) => any
  has: (this: Container, key: string) => boolean
  is: (this: Container, key: string, value: any) => boolean
  set: (this: Container, key: string, value: any) => void
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

type Container = ContainerInterface
type FileContainer = FileContainerInterface

const fs = {
  path,
  existsSync,
}

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
  return this.repository[key] && this.repository[key] !== null
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
  return this.fs.existsSync(key)
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

const container = function (this: Container, repository: Repository) {
  this.repository = repository
  this.new = newContainer
  this.get = get
  this.contents = contents
  this.set = set
  this.merge = merge
  this.delete = containerMethodDelete
  this.has = has
  this.is = is
  this.enable = enable
  this.enabled = enabled
  this.disable = disable
  this.disabled = disabled
}

container.prototype.fs = fs

const fileContainer = function (
  this: FileContainer,
  repository: Repository,
) {
  this.repository = repository
  this.fs = fs
  this.new = newContainer
  this.get = get
  this.contents = contents
  this.set = set
  this.merge = merge
  this.delete = containerMethodDelete
  this.has = has
  this.exists = exists
  this.is = is
  this.enable = enable
  this.enabled = enabled
  this.disable = disable
  this.disabled = disabled
}

export {container, fileContainer}
export type {Container, FileContainer, Repository}
