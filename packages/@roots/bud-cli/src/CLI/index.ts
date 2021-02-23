import {Mark} from '@roots/bud-dashboard'
import {yargs} from '@roots/bud-support'

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
  public heading(): this {
    console.log(Mark(this.command))

    return this
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.commands.map(cmd => this.instance.command(cmd))

    this.instance
      .scriptName(this.command)
      .version()
      .recommendCommands()
      .demandCommand(1, `You must specify a command.\n`)
      .help()
      .wrap(this.instance.terminalWidth())
      .epilog(this.projectUrl).argv
  }
}
