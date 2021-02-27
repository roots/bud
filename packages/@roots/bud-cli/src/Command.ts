import commander from 'commander'

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
   * Subcommands
   */
  public subcommands: (new (cli) => Command)[]

  /**
   * Index of positional arguments
   */
  public arguments: {[key: string]: string}

  /**
   * Index of flags
   */
  public options: {
    [key: string]: {
      description: string
      flags?: string
      fn?: (opt: commander.Option) => commander.Option
    }
  }

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
    return `${this.name} ${this.signature}`
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
    this.instance
      .name(this.name)
      .configureOutput(
        this.parent.output(this.instance.helpInformation()),
      )

    this.has('arguments')
      ? this.instance.description(
          this.description,
          this.arguments,
        )
      : this.instance.description(this.description)

    this.has('signature') && this.instance.usage(this.signature)

    this.has('options') &&
      Object.entries(this.options).map(([k, v]) => {
        const args: [string, string] | [string] = [v.description]
        if (v.flags) args.push(v.flags)

        this.instance.addOption(
          v.fn
            ? v.fn(new commander.Option(...args))
            : new commander.Option(...args),
        )
      })

    this.has('subcommands') &&
      this.subcommands.map(cmd =>
        this.instance.addCommand(new cmd(this.parent).yield()),
      )

    this.has('action') &&
      this.instance.action((...args) => {
        this.action(...args)
      })

    return this.instance
  }
}
