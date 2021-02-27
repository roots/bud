import commander from 'commander'
import type { Command as ICommand } from './interface'

/**
 * Command base class
 */
export default abstract class Command {
  /**
   * Commander instance
   */
  public instance: commander.Command

  /**
   * Parent command
   */
  public parent

  /**
   * Command handle
   */
  public abstract name: string

  /**
   * Human readable description of command
   */
  public abstract description: string

  /**
   * Index of positional arguments
   */
  public arguments: { [key: string]: string }

  /**
   * Index of flags
   */
  public options: ICommand.Options

  /**
   * Command signature
   * @example '[arg] [arg2]'
   */
  public signature: string

  /**
   * Run action handler
   */
  public abstract action(...args: any[]): void | Promise<void>

  /**
   * Constructor
   */
  public constructor(parent) {
    this.parent = parent
    this.instance = new commander.Command()
  }

  /**
   * Command
   */
  public get command() {
    return `${this.name} ${this.signature ?? ``}`
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
   * Yield the instance
   */
  public yield(): commander.Command {
    this.instance = this.instance
      .command(this.command)

    this.has('signature') && this.instance.arguments(this.signature)

    if (this.has('action')) {
      this.instance.action((...args) => {
        this.action(...args)
      })
    }

    this.has('options') &&
      this.options.map((opt) => {
        this.instance.option(...opt)
      })

    this.instance.helpOption('--help', 'Show help')

    return this.instance
  }
}
