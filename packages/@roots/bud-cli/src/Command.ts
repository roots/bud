import {CLI} from './CLI'

/**
 * Command base class
 */
export default abstract class Command {
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
  public arguments: {[key: string]: string} = {}

  /**
   * Index of flags
   */
  public options: {
    [key: string]: {
      [key: string]: any
    }
  }

  /**
   * Command signature
   * @example '[arg] [arg2]'
   */
  public signature: string = ''

  /**
   * Run action handler
   */
  public abstract action(...args: any[]): void | Promise<void>

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

  public get usage() {
    return this._usage ?? this.signature
  }
}
