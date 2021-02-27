import Builder from 'commander'

export type {Builder}

export interface Output {
  config: Builder.OutputConfiguration
}

export interface CLIConstructor {
  command?: string
  projectUrl?: string
  commands?: Command.Declaration
}

export interface CLI {
  command: string

  projectUrl: string

  instance: Builder.Command

  output: Output

  cwd: string

  commands: Command.Index

  invoke(): void

  process(commands: Command.Declaration): Command.Index

  register(): Builder.Command

  mast(): this
}

export interface Command {
  instance: Builder.Command

  parent: Command | CLI

  name: string

  description: string

  subcommands?: (new (cli) => Command)[]

  arguments?: { [key: string]: string }

  options?: Command.Options

  signature?: string

  action(...args: any[]): void | Promise<void>

  command: string

  has(query: string | string[]): boolean

  yield(): Builder.Command
}

export namespace Command {
  export type Option = [string, string, (string | boolean)?]
  export type Options = Array<Option>

  export type Index = {
    [key: string]: Command
  }

  export type Newable = new (cli: CLI) => Command

  export type Declaration = {
    [key: string]: Newable
  }
}

