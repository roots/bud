import {Mark} from '@roots/bud-dashboard'
import commander from 'commander'
import Output from './Output'
import {Builder, CLIConstructor, Command} from './interface'

/**
 * CLI
 */
export class CLI {
  /**
   * Command invocation
   */
  public command: string

  /**
   * Project URL
   */
  public projectUrl: string

  /**
   * Yargs
   */
  public instance: Builder.Command

  /**
   * Output
   */
  public output: Output

  /**
   * Cwd
   */
  public cwd = process.cwd()

  /**
   * Commands
   */
  public _commands: Command.Index

  /**
   * Constructor
   */
  public constructor(args?: CLIConstructor) {
    this.instance = new commander.Command()
    
    this.output = new Output(this)

    if (!args) return

    if (args?.command) this.command = args.command

    if (args?.projectUrl) this.projectUrl = args.projectUrl

    if (args?.commands)
      this.commands = this.process(args.commands)
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.register().helpOption(false).parse()
  }

  public get commands(): Command.Index {
    return this._commands
  }

  public set commands(commands: Command.Index) {
    this._commands = commands
  }

  /**
   * Add commands
   */
  public process(commands: Command.Declaration): Command.Index {
    return Object.fromEntries(
      Object.entries(commands).map(([k, v]): [
        string,
        Command,
      ] => [k, new v(this)]),
    )
  }

  /**
   * Apply commands
   */
  public register(): Builder.Command {
    return (this.instance = Object.values(this.commands).reduce(
      (instance: commander.Command, subcommand: Command) => {
        return instance.addCommand(subcommand.yield())
      },
      this.instance,
    ))
  }

  /**
   * CLI banner
   */
  public mast(): this {
    console.log(Mark(this.command))

    return this
  }
}
