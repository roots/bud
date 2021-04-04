import '@roots/bud-api'
import '@roots/bud-dashboard'

import {Framework} from '@roots/bud-framework'
import Builder, {Help} from 'commander'

export type {Builder, Help}

export interface Output {
  config: Builder.OutputConfiguration
}

export interface CLI {
  app: Framework

  name: string

  description: string

  instance: Builder.Command

  output: Output
}

export interface Command {
  name: string

  description: string

  cli: CLI

  usage: string

  subcommands?: (new (cli) => Command)[]

  help?: Help

  arguments?: {[key: string]: string}

  options?: Command.Options

  signature?: string

  action(...args: any[]): void | Promise<void>

  has(query: string | string[]): boolean
}

export namespace Command {
  export type Options = {
    [key: string]: any
  }

  export type Index = {
    [key: string]: Command
  }

  export type Newable = new (cli: CLI) => Command

  export type Declaration = {
    [key: string]: Newable
  }
}
