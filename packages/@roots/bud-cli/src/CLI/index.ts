import {yargs} from '@roots/bud-support'
import {cmd as build} from './commands/build'
import {cmd as publish} from './commands/publish/publish'
import {cmd as publishList} from './commands/publish/list'

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
  public commands = [build, publish, publishList]

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.commands.map(cmd => this.instance.command(cmd(this)))

    this.instance
      .describe(`bud`, `${this.command} <subcommand>`)
      .usage(`${this.command} <subcommand>`)
      .version()
      .help()
      .recommendCommands()
      .demandCommand(
        1,
        `You must specify a command. See \`${this.command} --help\` for usage.\n`,
      )
      .wrap(this.instance.terminalWidth())
      .epilog(this.projectUrl).argv
  }
}
