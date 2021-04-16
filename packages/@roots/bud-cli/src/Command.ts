import {CLI} from './CLI'
import {Help} from 'commander'
import {boundMethod as bind} from 'autobind-decorator'

interface Contract {
  name: string

  description: string

  cli: CLI

  usage: string

  subcommands?: (new (cli) => Command)[]

  help?: Help

  arguments?: {[key: string]: string}

  options?: {
    [key: string]: any
  }

  signature?: string

  action(...args: any[]): void | Promise<void>

  has(query: string | string[]): boolean
}

export {Command}

namespace Command {
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

/**
 * Command base class
 */
abstract class Command implements Contract {
  /**
   * Command handle
   */
  public abstract name: string

  /**
   * Human readable description of command
   */
  public abstract description: string

  /**
   * CLI host
   */
  public cli: CLI

  /**
   * Usage
   */
  public _usage: string = null

  /**
   * Index of positional arguments
   */
  public arguments?: {[key: string]: string} = {}

  /**
   * Index of flags
   */
  public options?: Command.Options

  /**
   * Command signature
   */
  public signature?: string = ''

  /**
   * Run action handler
   */
  public action(...args: any[]): void | Promise<void> {}

  /**
   * Constructor
   */
  public constructor(cli: CLI) {
    this.cli = cli
    this.action = this.action.bind(this)
  }

  /**
   * Ensure a command property is defined
   */
  @bind
  public has(query: string | string[]): boolean {
    return (Array.isArray(query) ? query : [query]).reduce(
      (res, prop) =>
        res !== false ? res : typeof this[prop] !== 'undefined',
      false,
    )
  }

  /**
   * Usage
   */
  public get usage() {
    return this._usage ?? this.signature
  }
}
