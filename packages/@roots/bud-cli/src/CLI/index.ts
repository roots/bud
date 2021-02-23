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
   * Add command
   */
  public addCommand(cmd: {cmd: yargs.CommandModule}) {
    this.commands.push(cmd)
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.commands.map(({cmd}) =>
      this.instance.command(cmd(this)),
    )

    this.instance
      .recommendCommands()
      .demandCommand(
        1,
        `You must specify a command. See \`${this.command} --help\` for usage.\n`,
      )
      .usage(this.command)
      .version()
      .wrap(this.instance.terminalWidth())
      .epilog(this.projectUrl).argv
  }
}
