import {Framework} from './'

export interface CLI {
  app: Framework

  name: string

  description: string

  projectUrl: string

  instance: Builder.Command

  output: Output

  cwd: string

  commands: Command.Newable[]

  merge(commands: Command.Newable[])

  invoke(): void

  mast(): this
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
  export type Option = {
    flags: string
    description: string
    default?: string | boolean
    choices?: string[]
    optional?: boolean
    usage?: string[]
  }

  export type Options = {
    [key: string]: Option
  }

  export type Index = {
    [key: string]: Command
  }

  export type Newable = new (cli: CLI) => Command

  export type Declaration = {
    [key: string]: Newable
  }
}
