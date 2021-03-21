import {CLI} from './CLI'
import {Command as Contract} from './interface'

/**
 * Command base class
 */
export abstract class Command implements Contract {
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
  public options?: Contract.Options

  /**
   * Command signature
   *
   * @example '[arg] [arg2]'
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
