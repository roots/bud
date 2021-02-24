import {yargs} from '@roots/bud-support'
import {Mark} from '@roots/bud-dashboard'

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
  public instance = yargs

  /**
   * Cwd
   */
  public cwd = process.cwd()

  /**
   * Commands
   */
  public _commands: {
    [key: string]: yargs.CommandModule
  }

  /**
   * Constructor
   */
  public constructor(args?: {
    command?: 'bud'
    projectUrl?: 'https://github.com/roots/bud'
    commands?: {[key: string]: yargs.CommandModule}
  }) {
    args && Object.assign(this, args)
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    Object.values(this.commands).map(cmd =>
      this.instance.command(cmd),
    )

    this.instance
      .example(`${this.command} build`, 'Compile assets')
      .example(
        `${this.command} build development`,
        'Compile project assets and start development server',
      )
      .example(
        `${this.command} publish:list`,
        `List available scaffolds`,
      )
      .scriptName(this.command)
      .version()
      .recommendCommands()
      .demandCommand(1, `You must specify a command.\n`)
      .help()
      .wrap(this.instance.terminalWidth())
      .epilog(this.projectUrl).argv
  }

  public get commands(): {[key: string]: yargs.CommandModule} {
    return this._commands
  }

  public set commands(commands: {
    [key: string]: yargs.CommandModule
  }) {
    this._commands = commands
  }

  /**
   * CLI banner
   */
  public mast(): this {
    console.log(Mark(this.command))

    return this
  }
}
