import {Error, Mark} from '@roots/bud-dashboard'
import commander from 'commander'
import Command from './Command'

type CommandIndex = {
  [key: string]: Command
}

type NewableCommand = new (cli: CLI) => Command

type CommandDeclaration = {
  [key: string]: NewableCommand
}

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
  public instance: commander.Command

  /**
   * Cwd
   */
  public cwd = process.cwd()

  /**
   * Commands
   */
  public _commands: CommandIndex

  /**
   * Constructor
   */
  public constructor(args?: {
    command?: 'bud'
    projectUrl?: 'https://github.com/roots/bud'
    commands?: CommandDeclaration
  }) {
    this.instance = new commander.Command()

    if (!args) return

    if (args?.command) this.command = args.command
    if (args?.projectUrl) this.projectUrl = args.projectUrl
    if (args?.commands)
      this.commands = this.process(args.commands)
  }

  /**
   * Output config
   */
  public output(helpInformation): commander.OutputConfiguration {
    return {
      writeOut: (str: string) => process.stdout.write(str),
      writeErr: (str: string) => process.stdout.write(str),
      outputError: (str: string, write) => {
        return write(Error(``, helpInformation))
      },
    }
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.register()
      .configureOutput(
        this.output(this.instance.helpInformation()),
      )
      .action(() => {
        this.instance.help()
      })
      .parse(process.argv)
  }

  public get commands(): CommandIndex {
    return this._commands
  }

  public set commands(commands: CommandIndex) {
    this._commands = commands
  }

  /**
   * Add commands
   */
  public process(commands: CommandDeclaration): CommandIndex {
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
  public register(): commander.Command {
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
