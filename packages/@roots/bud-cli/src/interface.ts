import Builder, {Help} from 'commander'

export type {Builder, Help}

export interface Output {
  config: Builder.OutputConfiguration
}

export interface CLIConstructor {
  name?: string
  projectUrl?: string
  commands?: Command.Declaration
}

export interface CLI {
  name: string

  description: string

  projectUrl: string

  instance: Builder.Command

  output: Output

  cwd: string

  commands: Command.Index

  invoke(): void

  mast(): this
}

export interface Command {
  name: string

  description: string

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
  }

  export type Options = {
    [key: string]: Option
  }

  export type Index = {
    [key: string]: Command
  }

  export type Newable = new () => Command

  export type Declaration = {
    [key: string]: Newable
  }
}
