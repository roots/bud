import {Loose} from '../base'

export type Repository = {
  [key: string]: any | any[]
}

export type RepositoryDefinition = {
  name: string
  register: Repository
}

export type MaybeCallable = any | ((any) => any) | any[]

export type Getter = (
  this: Container,
  key?: string,
) => MaybeCallable

export type Action = (this: Container, ...args: any) => void

export type ConditionalCheck = (
  this: Container,
  key: string,
  value?: any,
) => boolean

export interface Container extends Loose {
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

export interface FileContainer extends Container {
  require: Getter
  exists: ConditionalCheck
}

export interface PluginContainer extends Container {
  add: Action
}

export type ContainerBind = (
  repository: Repository,
) => Container | FileContainer | PluginContainer
