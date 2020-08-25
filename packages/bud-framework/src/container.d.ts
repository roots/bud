import type {Loose} from '@roots/bud-typings'

type Repository = {[key: string]: any | any[]} | any | any[]

type RepositoryDefinition = {
  name: string
  register: Repository
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
  push: Action
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

interface ExtensionContainerInterface extends ContainerInterface {
  add: Action
}

type Container = ContainerInterface
type FileContainer = FileContainerInterface
type ExtensionContainer = ExtensionContainerInterface

type ContainerBind = (
  repository: Repository,
) => Container | FileContainer | ExtensionContainer

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
