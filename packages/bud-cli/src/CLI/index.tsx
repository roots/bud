import {yargs} from '@roots/bud-support'
import Service from './Service'

/**
 * CLI
 */
export class CLI extends Service {
  /**
   * Service ident
   */
  public name = 'Framework.CLI'

  /**
   * Yargs
   */
  public instance = yargs

  /**
   * Cwd
   */
  public cwd = process.cwd()

  /**
   * Command invocation
   */
  public command = 'bud'

  /**
   * Commands
   */
  public subcommands = [
    require('./commands/build'),
    require('./commands/publish'),
  ]

  /**
   * Add command
   */
  public addCommand(cmd) {
    this.subcommands.push(cmd)
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.subcommands.map(cmd => this.instance.command(cmd))

    this.instance
      .recommendCommands()
      .demandCommand(
        1,
        'You must specify a command. See `bud --help` for usage.\n',
      )
      .usage('\nBud \n\nbud [command] [options]')
      .version()
      .wrap(this.instance.terminalWidth())
      .epilog('https://github.com/roots/bud').argv
  }
}
