import {yargs} from '@roots/bud-support'
import {Mark} from '@roots/bud-dashboard'

/**
 * CLI
 */
export class CLI {
  /**
   * Command invocation
   */
  public command = 'bud'

  /**
   * Project URL
   */
  public projectUrl = 'https://github.com/roots/bud'

  /**
   * Yargs
   */
  public instance = yargs

  /**
   * Cwd
   */
  public cwd = process.cwd()

  /**
   * Constructor
   */
  public constructor(args?: {
    command?: 'bud'
    projectUrl?: 'https://github.com/roots/bud'
  }) {
    args && Object.assign(this, args)
  }

  /**
   * Commands
   */
  public commands = [
    require('./commands/build'),
    require('./commands/publish/publish'),
    require('./commands/publish/list'),
  ]

  /**
   * Heading
   */
  public mast(): this {
    console.log(Mark(this.command))
    return this
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.commands.map(cmd => this.instance.command(cmd))

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
}
